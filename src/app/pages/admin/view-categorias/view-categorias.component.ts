/* import { CategoriaService } from './../../../services/categoria.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categorias',
  templateUrl: './view-categorias.component.html',
  styleUrls: ['./view-categorias.component.css']
})
export class ViewCategoriasComponent implements OnInit {

  categorias: any = [];

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.categoriaService.listarCategorias().subscribe(
      (dato: any) => {
        this.categorias = dato;
        console.log(this.categorias);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Error al cargar las categorías', 'error');
      }
    )
  }

  eliminarCategoria(categoriaId: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriaService.eliminarCategoria(categoriaId).subscribe(
          (data) => {
            Swal.fire(
              '¡Eliminado!',
              'La categoría ha sido eliminada.',
              'success'
            );
            this.cargarCategorias(); // Recargar la lista de categorías
          },
          (error) => {
            console.log(error);
            Swal.fire('Error !!', 'Error al eliminar la categoría', 'error');
          }
        );
      }
    });
  }
} */




import Swal from 'sweetalert2';
import { CategoriaService } from './../../../services/categoria.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-categorias',
  templateUrl: './view-categorias.component.html',
  styleUrls: ['./view-categorias.component.css']
})
export class ViewCategoriasComponent implements OnInit {

  categorias:any = []

  constructor(private categoriaService:CategoriaService) { }

  ngOnInit(): void {
    this.categoriaService.listarCategorias().subscribe(
      (dato:any) => {
        this.categorias = dato;
        console.log(this.categorias);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!','Error al cargar las categorías','error');
      }
    )
  }

  eliminarCategoria(categoriaId: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriaService.eliminarCategoria(categoriaId).subscribe(
          () => {
            this.categorias = this.categorias.filter((categoria: any) => categoria.id !== categoriaId);
            Swal.fire('Eliminada', 'La categoría ha sido eliminada.', 'success');
          },
          (error) => {
            console.log(error);
            Swal.fire('Error !!', 'Error al eliminar la categoría, se deben eliminar primero todos los exámenes asociados a esta categoría', 'error');
          }
        );
      }
    });
  }
}

