import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { CommonModule, NgForOf } from "@angular/common";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [FormsModule, NgForOf, CommonModule],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.css'
})
export class AdminProductsComponent implements OnInit {

  restaurantId = 1;
  products: any[] = [];
  categories: any[] = [];
  ingredients: any[] = [];
  allergens: any[] = [];

  modoFormulario: 'crear' | 'editar' | '' = '';
  editingProduct: any = null;
  selectedEditProductId: number | null = null;

  @ViewChild('imageInput') imageInputRef!: ElementRef<HTMLInputElement>;

  newProduct = {
    name: '',
    description: '',
    price: 0,
    rating: 0.0,
    categoryId: '',
    ingredientIds: [] as number[]
  };

  productImageBase64: string | null = null;
  newProductAllergenIds: number[] = [];
  selectedIngredientId: number | '' = '';
  selectedAllergenId: number | '' = '';

  filterName: string = '';
  filterCategoryId: string = '';

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
    this.loadIngredients();
    this.loadAllergens();
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  loadProducts() {
    this.http.get<any[]>(`http://localhost:5001/api/food/restaurant/${this.restaurantId}`, {
      headers: this.getAuthHeaders(),
    }).subscribe(data => {
      this.products = data.map(product => ({
        ...product,
        image: product.image ? `http://localhost:5001/uploads/${product.image}` : 'assets/imgNotFound.png',
      }));
    });
  }

  loadCategories() {
    this.http.get<any[]>(`http://localhost:5001/api/category/restaurant`, {
      headers: this.getAuthHeaders(),
    }).subscribe(data => this.categories = data);
  }

  loadIngredients() {
    this.http.get<any[]>(`http://localhost:5001/api/admin/ingredients/restaurant/${this.restaurantId}`, {
      headers: this.getAuthHeaders(),
    }).subscribe(data => this.ingredients = data);
  }

  loadAllergens() {
    this.http.get<any[]>('http://localhost:5001/api/admin/allergen/all', {
      headers: this.getAuthHeaders()
    }).subscribe(data => this.allergens = data);
  }

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        if (this.modoFormulario === 'crear') {
          this.productImageBase64 = base64;
        } else if (this.modoFormulario === 'editar' && this.editingProduct) {
          this.editingProduct.image = base64;
        }
      };
      reader.readAsDataURL(file);
    }
  }


  crearProducto() {
    if (!this.productImageBase64) {
      alert('Por favor selecciona una imagen.');
      return;
    }

    if (this.newProduct.rating < 0 || this.newProduct.rating > 5) {
      alert('La puntuación debe estar entre 0.0 y 5.0');
      return;
    }

    const body = {
      name: this.newProduct.name,
      description: this.newProduct.description,
      price: this.newProduct.price,
      rating: this.newProduct.rating,
      category: { id: this.newProduct.categoryId },
      restaurantId: this.restaurantId,
      seasonal: false,
      image: this.productImageBase64,
      ingredients: this.newProduct.ingredientIds.map(id => {
        const ingredient = this.ingredients.find(i => i.id === +id);
        return { id: ingredient.id, name: ingredient.name };
      }),
      allergens: this.newProductAllergenIds.map(id => ({ id }))
    };

    this.http.post('http://localhost:5001/api/admin/food', body, {
      headers: this.getAuthHeaders(),
    }).subscribe({
      next: () => {
        this.newProduct = { name: '', description: '', price: 0, rating: 0.0, categoryId: '', ingredientIds: [] };
        this.productImageBase64 = null;
        this.newProductAllergenIds = [];
        this.selectedIngredientId = '';
        this.selectedAllergenId = '';
        this.imageInputRef.nativeElement.value = '';
        this.loadProducts();
      },
      error: () => alert('Error al crear producto')
    });
  }

  eliminarProducto(id: number) {
    this.http.delete(`http://localhost:5001/api/admin/food/${id}`, {
      headers: this.getAuthHeaders(),
    }).subscribe(() => this.loadProducts());
  }

  getCategoryName(id: number | string): string {
    return this.categories.find(c => c.id === +id)?.name || '';
  }

  getIngredientName(id: number): string {
    return this.ingredients.find(i => i.id === id)?.name || '';
  }

  getAllergenName(id: number): string {
    return this.allergens.find(a => a.id === id)?.name || '';
  }

  availableIngredients() {
    return this.ingredients.filter(ing => !this.newProduct.ingredientIds.includes(ing.id));
  }

  availableAllergens() {
    return this.allergens.filter(al => !this.newProductAllergenIds.includes(al.id));
  }

  addIngredient() {
    if (this.selectedIngredientId && !this.newProduct.ingredientIds.includes(+this.selectedIngredientId)) {
      this.newProduct.ingredientIds.push(+this.selectedIngredientId);
      this.selectedIngredientId = '';
    }
  }

  removeIngredient(id: number) {
    this.newProduct.ingredientIds = this.newProduct.ingredientIds.filter(i => i !== id);
  }

  removeEditingIngredient(id: number): void {
    this.editingProduct.ingredientIds = this.editingProduct.ingredientIds.filter((i: number) => i !== id);
  }

  removeEditingAllergen(id: number): void {
    this.editingProduct.allergens = this.editingProduct.allergens.filter((a: { id: number }) => a.id !== id);
  }

  addEditingIngredient() {
    if (
      this.selectedIngredientId &&
      !this.editingProduct.ingredientIds.includes(+this.selectedIngredientId)
    ) {
      this.editingProduct.ingredientIds.push(+this.selectedIngredientId);
      this.selectedIngredientId = '';
    }
  }

  addEditingAllergen() {
    if (
      this.selectedAllergenId &&
      !this.editingProduct.allergens.some((a: any) => a.id === +this.selectedAllergenId)
    ) {
      const allergen = this.allergens.find(a => a.id === +this.selectedAllergenId);
      if (allergen) {
        this.editingProduct.allergens.push({ id: allergen.id, name: allergen.name });
        this.selectedAllergenId = '';
      }
    }
  }




  addAllergen() {
    if (this.selectedAllergenId && !this.newProductAllergenIds.includes(+this.selectedAllergenId)) {
      this.newProductAllergenIds.push(+this.selectedAllergenId);
      this.selectedAllergenId = '';
    }
  }

  removeAllergen(id: number) {
    this.newProductAllergenIds = this.newProductAllergenIds.filter(a => a !== id);
  }

  getFilteredProducts() {
    return this.products.filter(p => {
      const matchesName = p.name.toLowerCase().includes(this.filterName.toLowerCase());
      const matchesCategory = this.filterCategoryId ? p.foodCategory?.id === +this.filterCategoryId : true;
      return matchesName && matchesCategory;
    });
  }

  cargarProductoAEditar() {
    if (!this.selectedEditProductId) return;

    this.http.get<any>(`http://localhost:5001/api/food/${this.selectedEditProductId}`, {
      headers: this.getAuthHeaders()
    }).subscribe({
      next: data => {
        this.editingProduct = {
          ...data,
          categoryId: data.foodCategory?.id || '',
          ingredientIds: data.ingredients?.map((i: any) => i.id) || [],
          allergens: data.allergens || [],
          image: data.image ? `http://localhost:5001/uploads/${data.image}` : 'assets/imgNotFound.png'
        };
      },
      error: err => {
        console.error('Error al cargar el producto completo:', err);
        alert('No se pudo cargar el producto');
      }
    });
  }




  cancelarEdicion() {
    this.editingProduct = null;
    this.selectedEditProductId = null;
    this.modoFormulario = '';
  }

  guardarEdicion() {
    const imagenOriginal = this.editingProduct.image;
    let imagenFinal: string;

    if (imagenOriginal?.startsWith('data:image')) {
      imagenFinal = imagenOriginal;
    } else {
      imagenFinal = imagenOriginal?.split('/').pop() ?? null;
    }

    const body = {
      id: this.editingProduct.id,
      name: this.editingProduct.name,
      description: this.editingProduct.description,
      price: this.editingProduct.price,
      rating: this.editingProduct.rating,
      foodCategory: { id: this.editingProduct.categoryId },
      image: imagenFinal,
      restaurantId: this.restaurantId,
      ingredients: this.editingProduct.ingredientIds.map((id: number) => ({ id })),
      allergens: this.editingProduct.allergens.map((a: { id: number }) => ({ id: a.id }))
    };

    this.http.put(`http://localhost:5001/api/admin/food/${this.editingProduct.id}`, body, {
      headers: this.getAuthHeaders(),
    }).subscribe({
      next: () => {
        this.editingProduct = null;
        this.selectedEditProductId = null;
        this.loadProducts();
        this.modoFormulario = '';
      },
      error: (err) => {
        console.error('Error al editar producto', err);
        alert('Error al editar producto');
      },
    });
  }
}
