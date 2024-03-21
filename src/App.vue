<script>
import axios from 'axios';
import Swal from 'sweetalert2';

// import 'bootstrap/dist/css/bootstrap.min.css';
// import * as bootstrap from 'bootstrap';
// import { Modal } from 'bootstrap';
import Agregar from './components/Agregar.vue';



export default {
  components: {
    Agregar
  },
  data() {
    return {
      loading: true,
      btnAgregar: true,
      modalTitle: 'Agregar Registro',
      ListaUsuario: [], // Define ListaUsuario dentro de data
      originalList: [], // Nueva propiedad para almacenar la lista original
      busqueda: '',
      itemsPerPage: 5, // Número de elementos por página
      currentPage: 1, // Página actual
    };
  },
  mounted() {
    // this.Lista();
  },
  computed: {
    totalPages() {
      return Math.ceil(this.ListaUsuario.length / this.itemsPerPage);
    },
    paginatedListaUsuario() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = this.currentPage * this.itemsPerPage;
      return this.ListaUsuario.slice(startIndex, endIndex);
    }
  },
  methods: {
    Lista() {
      // Hacemos una petición a la API v1 de Nube Colectiva
      axios.get('https://65f34f70105614e654a05799.mockapi.io/inea/api/v1/user') // Agrega https:// antes de la URL
        .then((response) => {
          // Asignamos los datos obtenidos a ListaUsuario
          this.loading = false;
          this.ListaUsuario = response.data;
          this.originalList = response.data;
          this.sortAsc(); // Llamada al método para ordenar descendente
        })
        .catch((error) => {
          // Si hubo algún error, lo mostramos
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: error.message,
            showConfirmButton: false,
            timer: 2000
          });
        })
        .finally(() => {
          // Se ejecutó sin problemas
          // console.info('Finalizó');
        });
    },
    Delete(row) {
      Swal.fire({
        title: "Esta seguro?",
        html: `Eliminar el registro  <strong><font color='red'>${row.nombres}</font></strong>`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Eliminalo!",
        cancelButtonText: "Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`https://65f34f70105614e654a05799.mockapi.io/inea/api/v1/user/${row.id}`) // Agrega https:// antes de la URL
            .then((response) => {
              this.ListaUsuario = []
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Registro Eliminado",
                showConfirmButton: false,
                timer: 2000
              });
              this.Lista()
            })
            .catch((error) => {
              // Si hubo algún error, lo mostramos
              Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Oops! algo salio mal!",
                showConfirmButton: false,
                timer: 2000
              });
            })
        }
      });
    },
    closeModal() {
      if (this.$refs.modal && this.$refs.modal.$el) {
        // Close the modal
        this.$refs.modal.$el.style.display = 'none';
        // Reset the modal backdrop
        const modalBackdrop = document.querySelector('.modal-backdrop');
        if (modalBackdrop) {
          modalBackdrop.remove();
        }
      }
    },
    abrirModal(tipo, userData) {
      const myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
      if (tipo === 'agregar') {
        this.modalTitle = 'Agregar Registro';
        this.btnAgregar = true;
      } else if (tipo === 'actualizar') {
        this.modalTitle = 'Actualizar Registro';
        this.btnAgregar = false;
        this.$refs.modal.EditForm(userData);
      }
      myModal.show();
    },
    async agregarRegistro(registroAgregar) {
      await axios.post('https://65f34f70105614e654a05799.mockapi.io/inea/api/v1/user', registroAgregar)
        .then((response) => {
          this.ListaUsuario = []
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Datos registrado correctamente",
            showConfirmButton: false,
            timer: 2000
          });
          this.Lista()
        })
        .catch(error => {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Oops! algo salio mal!",
            showConfirmButton: false,
            timer: 2000
          });
        })
    },
    async actualizarRegistro(actualizarRegistro) {
      await axios.put(`https://65f34f70105614e654a05799.mockapi.io/inea/api/v1/user/${actualizarRegistro.id}`, actualizarRegistro)
        .then((response) => {
          this.ListaUsuario = []
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Datos Actualizado correctamente",
            showConfirmButton: false,
            timer: 2000
          });
          this.Lista()
        })
        .catch(error => {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Oops! algo salio mal!",
            showConfirmButton: false,
            timer: 2000
          });
        })
    },
    goToPage(page) {
      this.currentPage = page;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    sortAsc() {
      this.paginatedListaUsuario.sort((a, b) => {
        return a.id - b.id; // Reemplaza "id" con el campo por el cual deseas ordenar de forma ascendente
      });
    },
    buscarReg() {
      const filtro = this.busqueda.toLowerCase().trim();
      this.ListaUsuario = this.originalList.filter((user) => {
        return Object.values(user).some((value) =>
          String(value).toLowerCase().includes(filtro)
        );
      });
    },
    buscar(event) {
      this.currentPage = 1;
      this.busqueda = event.target.value;
      if (!this.busqueda) { // Si el campo de búsqueda está vacío, restaurar la lista original
        this.ListaUsuario = this.originalList;
      } else {
        this.buscarReg(); // Realizar la búsqueda
      }
    },
  },
  created() {
    this.Lista();
  }

}

</script>

<template>
  <!-- <router-view /> -->

  <div class="container">
    <h1>CRUDSP</h1>

    <hr>
    <div class="row">
      <div class="col">
        <div class="input-group">
          <div style="margin-right: 10px;">
            <button class="btn btn-success" type="button" @click="abrirModal('agregar', 'data')">Agregar
              Usuario</button>
          </div>
          <input type="text" class="form-control" placeholder="Buscar Usuario" v-model="busqueda"
            @input="buscar($event)">
        </div>
      </div>
    </div>
    <hr>
  </div>



  <div v-if="loading">Cargando datos, porfavor espere...</div>


  <table class="table" v-if="!loading">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Nombre</th>
        <th scope="col">Apellidos</th>
        <th scope="col">Sexo</th>
        <th scope="col">Email</th>
        <th scope="col">Accion</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(user, index) in paginatedListaUsuario" :key="index">
        <td scope="row">{{ user.id }}</td>
        <td>{{ user.nombres }}</td>
        <td>{{ user.apellidos }}</td>
        <td>{{ user.sexo }}</td>
        <td>{{ user.email }}</td>
        <td>
          <div class="btn-group" role="group">
            <button class="btn btn-sm btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal"
              @click="abrirModal('actualizar', user)">Editar</button>
            <button class="btn btn-sm btn-danger" @click="Delete(user)">Eliminar</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>

  <nav aria-label="Paginador del datatable">
    <ul v-if="totalPages > 1" class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <a class="page-link" href="#" tabindex="-1" aria-disabled="true" @click="previousPage">Anterior</a>
      </li>
      <li v-for="pageNumber in totalPages" :key="pageNumber" class="page-item"
        :class="{ active: pageNumber === currentPage }">
        <a class="page-link" href="#" @click="goToPage(pageNumber)">{{ pageNumber }}</a>
      </li>
      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <a class="page-link" href="#" @click="nextPage">Siguiente</a>
      </li>
    </ul>
  </nav>




  <Agregar ref="modal" :modalTitle="modalTitle" :btnAgregar="btnAgregar" @registroActualizado="actualizarRegistro"
    @registroAgregar="agregarRegistro" @closeModal="closeModal">
  </Agregar>


</template>

<style scoped></style>
