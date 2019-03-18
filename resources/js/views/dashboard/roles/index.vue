<template>
<v-flex xs12 md12 mt-4>
  <v-card>
    <v-card-title>
      <v-layout row justify-space-between class="blue-gradient card-title-out" wrap>
        <v-flex xs12 sm2 md2>
        </v-flex>
        <v-flex xs12 sm2 md2 d-flex align-self-center>
          <h3> Usuarios </h3>
        </v-flex>
        <v-flex xs12 sm2 md2>
          <v-btn fab dark small color="green darken-2" @click="dialog = true">
            <v-icon dark>add</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-card-title>
    <v-card-text>
      <v-card>
        <v-card-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
            color="primary">
          </v-text-field>
        </v-card-title>
        <v-divider style="border-top-width: 2px;"></v-divider>
        <v-data-table
          :headers="headers"
          :items="roles"
          :rows-per-page-items="rowsPerPageItems"
          :search="search"
          rows-per-page-text="Filas por página"
          :pagination.sync="pagination"
          class="elevation-1"
          >
          <template slot="items" slot-scope="props">
            <td class="d-none"></td>
            <td class="text-xs-center">{{ props.item.name }}</td>
            <td class="text-xs-center">{{ props.item.display_name }}</td>
            <td class="d-none"></td>
            <td class="justify-center layout px-0">
              <v-btn flat icon color="warning" @click="editRol(props.item)">
                <v-icon >edit</v-icon>
              </v-btn>
              <v-btn flat icon color="red darken-1" @click="deleteRol(props.item)">
                <v-icon>delete</v-icon>
              </v-btn>
            </td>
          </template>
          <template slot="no-data">
             <v-layout row justify-space-between wrap>
              <v-flex xs12 sm2 md10 d-flex align-self-center>
                <h4 class="text-xs-center">No hay datos disponibles</h4>
              </v-flex>
              <v-flex xs12 sm2 md2>
                 <v-btn @click="getRoles" color="warning" fab dark small title="Recargar">
              <v-icon>refresh</v-icon>
            </v-btn>
              </v-flex>
            </v-layout>
          </template>
          <template slot="pageText" slot-scope="props">
            Registros {{ props.pageStart }} - {{ props.pageStop }} de {{ props.itemsLength }}
          </template>
          <template slot="no-results">
            <h4 class="text-xs-center">Su búsqueda como "{{ search }}" no encontró resultados.</h4>
          </template>
        </v-data-table>
      </v-card>
    </v-card-text>
  </v-card>

  <v-dialog persistent v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title class="justify-center layout px-0">
        <span class="headline" >{{ formTitle }}</span>
      </v-card-title>
      <v-divider class="mx-2"></v-divider>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm6 md12>
              <v-text-field v-model="dataRol.name" label="Rol * "></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md12>
              <v-text-field v-model="dataRol.display_name" label="Nombre * "></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" round flat @click="closeDialog">Cancelar</v-btn>
        <v-btn color="blue darken-1" round flat @click="saveRol">Guiardar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</v-flex>

</template>

<script>
  import RolesServices from '../../../services/RolesServices.js';
  export default {
    name : 'Index',
    data() {
      return {
        defaultNameImg: 'Imagen',
        ImgPreview: '/',
        search: '',
        dialog: false,
        pagination: { 
          sortBy: 'updated_at',
          descending : 'true'
        },
        rowsPerPageItems : 
          [ 5,10,25,
            {"text":"$vuetify.dataIterator.rowsPerPageAll","value":-1}
          ],
        headers: [
          { text: 'id', value: 'id', align: 'center' , sortable: false , class:"d-none" },
          { text: 'Rol', value: 'name', align: 'center'},
          { text: 'Nombre', value: 'display_name',  align: 'center' },
          { text: 'updated_at', value: 'updated_at', align: 'center', class:"d-none" },
          { text: 'Actions', value: 'actions', align: 'center', sortable: false }
        ],
        roles : [],
        editedIndex: -1,
        dataRol: {
          id : '',
          name: '',
          display_name: '',
        },
        defaultRol: {
          id : '',
          name: '',
          display_name: '',
        }
      }
    },
    beforeCreate () {
      if(!this.$store.getters.authenticatedUser){
        this.$router.push({name: 'Login'});
      }
    },
    created(){
      this.getRoles();
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo Rol' : 'Editar Rol'
      }
    },
    watch: {
      dialog (val) {
        val || this.closeDialog()
      }
    },
    methods: {
      getRoles(){
        RolesServices.getRoles()
        .then( res => {
          this.roles = res.data;
          console.log();
        })
        .catch( err => {
          console.log("error getProductos");
        });
      },
      storeRol(){
        RolesServices.store(this.dataRol)
        .then( res => {
          this.closeDialog()
        })
        .catch( err => {
          console.log("error store");
        });
      },
      updateRol(){
        RolesServices.update(this.dataRol)
        .then( res => {
          this.closeDialog()
        })
        .catch( err => {
          console.log("error update");
        });
      },
      deleteRol(rol){
        RolesServices.delete(rol.id)
        .then( res => {
          this.closeDialog()
        })
        .catch( err => {
          console.log("error update");
        });
      },
      editRol (rol) {
        this.editedIndex = this.roles.indexOf(item)
        this.editedItem = Object.assign({}, rol)
        this.dialog = true
      },
      closeDialog () {
        this.dialog = false
        setTimeout(() => {
          this.dataRol = Object.assign({}, this.defaultRol)
          this.ImgPreview = '/'
          this.editedIndex = -1
        }, 300)
      },
      saveRol () {
        if (this.editedIndex > -1) {
          this.updateProducto()
        } else {
          this.storeProducto()
        }
      }
    },
  }
</script>
<style scoped>
  .jbtn-file {
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .jbtn-file input[type=file] {
    position: absolute;
    top: 0;
    right: 0;
    min-width: 100%;
    min-height: 100%;
    text-align: right;
    filter: alpha(opacity=0);
    opacity: 0;
    outline: none;
    cursor: inherit;
    display: block;
  }
</style>