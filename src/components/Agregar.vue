<script>

export default {
    props: {
        modalTitle: {
            type: String,
            required: true,
        },
        btnAgregar: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            btnActivo: true, // Inicializar con el valor por defecto
            formData: {
                nombres: '',
                apellidos: '',
                sexo: '',
                email: ''
            },
        };
    },
    watch: {
        btnAgregar: {
            immediate: true,
            handler(newVal) {
                this.btnActivo = newVal;
            }
        }
    },
    methods: {
        capturarBoton() {
            const formDataCopy = { ...this.formData };
            /*
            esta expresión se utiliza para crear una copia superficial 
            (copia de nivel superior) del objeto formData obteniendo una copia 
            independiente de los datos existentes en formData
            */
            if (this.btnAgregar) {
                this.$emit('registroAgregar', formDataCopy);
                this.limpiarForm()
                this.$emit('closeModal');
            } else {
                this.$emit('registroActualizado', formDataCopy);
                this.limpiarForm()
                this.$emit('closeModal');
            }
        },
        EditForm(userData) {
            this.formData = { ...userData };
            this.$emit('closeModal');
        },
        limpiarForm() {
            this.formData.nombres = ''
            this.formData.apellidos = ''
            this.formData.sexo = ''
            this.formData.email = ''
        },
        limpiarForm2() {
            this.formData = {
                nombres: '',
                apellidos: '',
                sexo: '',
                email: ''
            }
        }
    }
}
</script>

<template>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{{ modalTitle }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form @submit.prevent="capturarBoton"> <!-- Agregando el modificador ".prevent" -->
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="exampleInputEmail1">Nombres</label>
                            <input type="text" class="form-control" id="name" v-model="formData.nombres"
                                aria-describedby="emailHelp" placeholder="Nombres">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Apellidos</label>
                            <input type="text" class="form-control" id="email" v-model="formData.apellidos"
                                placeholder="Apellidos">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Sexo</label>
                            <input type="text" class="form-control" id="email" v-model="formData.sexo"
                                placeholder="Sexo">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Email</label>
                            <input type="mail" autocomplete="off" class="form-control" id="email"
                                v-model="formData.email" placeholder="Email">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="submit" class="btn btn-success" v-if="btnAgregar">Agregar</button>
                        <button type="submit" class="btn btn-warning" v-else>Actualizar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
