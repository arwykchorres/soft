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
          :items="users"
          :rows-per-page-items="rowsPerPageItems"
          :search="search"
          rows-per-page-text="Filas por página"
          :pagination.sync="pagination"
          class="elevation-1"
          >
          <template slot="items" slot-scope="props">
             <td class="d-none"></td>
            <td class="text-xs-center">{{ props.item.nombre_completo }}</td>
            <td class="text-xs-center">{{ props.item.email }}</td>
            <td class="text-xs-center">{{ props.item.rol.display_name }}</td>
            <td class="text-xs-center">
                  <v-list-tile-avatar style="display: inline !important;">
                    <img :src="props.item.foto_url">
                  </v-list-tile-avatar>
            </td>
             <td class="d-none"></td>
            <td class="justify-center layout px-0">
              <v-btn flat icon color="warning" @click="editUser(props.item)">
                <v-icon >edit</v-icon>
              </v-btn>
              <v-btn flat icon color="red darken-1" @click="deleteUser(props.item)">
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
                 <v-btn @click="getUsers" color="warning" fab dark small title="Recargar">
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
          <v-form
            ref="form"
            v-model="validarForm"
            lazy-validation>
          <v-layout wrap>
            <v-flex xs12 sm6 md12>
              <v-text-field 
                v-model="dataUser.nombre_completo" 
                label="Nombre Completo * " 
                :rules="nombreCompletoRules"
                ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md12>
              <v-text-field 
                v-model="dataUser.email" 
                label="Email * "
                :rules="emailRules"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md12>
              <v-text-field 
                v-model="dataUser.password" 
                :label="editedIndex === -1 ? 'Password *' : 'Password'" 
                :type="'password'"
                :hint="this.editedIndex === -1 ? '' : 'Dejar en blanco si no quieres cambiar la contraseña'"
                :rules="passwordRules">
              </v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md5>
              <v-select :items="roles"
                        item-text="display_name"
                        item-value="id"
                        label="Rol"
                        v-model="dataUser.rol_id">
              </v-select>
            </v-flex>
            <v-flex xs12 sm6 md2 d-flex justify-space-between  align-center>
              Foto* :
              <v-text-field v-model="dataUser.foto_url" class="d-none" :rules="fotoRules"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md2 d-flex justify-space-between  align-center>
              <div></div>
                <img id="img-preview" :src="ImgPreview" style="max-width: 40px; max-height: 40px;" >
              <div></div>
            </v-flex>
            <v-flex xs12 sm6 md2 d-flex justify-space-between  align-center>
              <div class="v-btn v-btn--floating v-btn--small jbtn-file"> 
                <v-icon >cloud_upload</v-icon>
                <input type="file" v-on:change="fileSelected">
              </div>
            </v-flex>
          </v-layout>
          </v-form>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" round flat @click="closeDialog">Cancel</v-btn>
        <v-btn color="blue darken-1" round flat @click="saveUser">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</v-flex>

</template>

<script>
  import UsersServices from '../../../services/UsersServices.js';
  export default {
    name : 'Index',
    data() {
      return {
        //rules
        nombreCompletoRules : [
          v => !!v || 'El campo es requerido',
          v => v.length >= 3 || 'El nombre debe tener como minimo 3 caracteres'
        ],
        emailRules : [
          v => !!v || 'El campo es requerido',
          v => v.length >= 6 || 'El email debe tener como minimo 6 caracteres',
          v => /.+@.+/.test(v) || 'E-mail no es válido'
        ],
        passwordRules : [
          v => !!v || 'El campo es requerido',
          v => v.length >= 6 || 'El password debe tener como minimo 6 caracteres'
        ],
        fotoRules: [
          v => !!v || 'El campo es requerido',
        ],
        validarForm: true,
        //Data
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
          { text: 'Nombre Completo', value: 'nombre_completo', align: 'center'},
          { text: 'Email', value: 'email',  align: 'center' },
          { text: 'Rol', value: 'rol_id' , align: 'center'},
          { text: 'foto', value: 'foto_url', align: 'center', sortable: false },
          { text: 'updated_at', value: 'updated_at', align: 'center', class:"d-none" },
          { text: 'Actions', value: 'actions', align: 'center', sortable: false }
        ],
        users : [],
        roles : [],
        editedIndex: -1,
        dataUser: {
          id : '',
          nombre_completo: '',
          email: '',
          rol_id: 1,
          password : '',
          foto_url: ''
        },
        defaultUser: {
          id : '',
          nombre_completo: '',
          email: '',
          rol_id: 1,
          password : '',
          foto_url: ''
        }
      }
    },
    beforeCreate () {
      if(!this.$store.getters.authenticatedUser){
        this.$router.push({name: 'Login'});
      }
    },
    created(){
      this.getUsers();
      this.getListSelectRoles();
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo Usuario' : 'Editar Usuario'
      }
    },
    watch: {
      dialog (val) {
        val || this.closeDialog()
      },
      editedIndex (){
        //debido a que el password al crear es requerido, al editar no lo es
        this.editedIndex === -1 ? this.passwordRules = [
          v => !!v || 'El campo es requerido',
          v => v.length >= 6 || 'El password debe tener como minimo 6 caracteres'
        ] :
        this.passwordRules = [];
      },
      'dataUser.password'(){
        //Para validar el password
        if(this.editedIndex !== -1){
          if(this.dataUser.password.length > 0){
            this.passwordRules = [
              v => v.length >= 6 || 'El password debe tener como minimo 6 caracteres'
            ];
          }else{
            this.passwordRules = []
          }
        }
      }
    },
    methods: {
      validateForm () {
        if (this.$refs.form.validate()) {
          return true;
        }
        return false;
      },
      fileSelected(e) {
        //2000000 2mb
        let files = e.target.files || e.dataTransfer.files;
        let auxFile = files;
        var allowedExtensions = /(.jpg|.jpeg|.png)$/i;
        if (!files.length || files[0].size > 2000000 || !allowedExtensions.exec(auxFile[0].name)){
          displayMessage("Seleccine una imagen" , "error" , true);
          return;
        }
        this.dataUser.foto_url = files[0];    
        this.displayImgPreview(files[0], false);
      },
      displayImgPreview(imgPath, exist){
        let reader = new FileReader();
        //si la imagen no existe en el servidor
        if(!exist){
          reader.onload = function (e) {
            this.ImgPreview = e.target.result;
          }.bind(this); 
          reader.readAsDataURL(imgPath);
        }
        //Si la img existe en el servidor
        else{
          ImgPreview.src = imgPath;
        }
      },
      getListSelectRoles(){
        UsersServices.getListSelectRoles()
        .then( res => {
          this.roles = res.data;
        })
        .catch( err => {
          console.log("error getProductos");
        });
      },
      getUsers(){
        UsersServices.getUsers()
        .then( res => {
          this.users = res.data.data;
        })
        .catch( err => {
          displayMessage("Problemas al cargar los usuarios" , "error" , true);
        });
      },
      storeProducto(){
        UsersServices.store(this.getFormUser(this.dataUser, 'POST'))
        .then( res => {
          this.getUsers()
          this.closeDialog()
          displayMessage(""+ res.data , "success" , false);
        })
        .catch( err => {
          displayMessage("Problemas al crear el Usuario" , "error" , true);
        });
      },
      updateProducto(){
        UsersServices.update(this.dataUser.id, this.getFormUser(this.dataUser, 'PUT'))
        .then( res => {
          this.getUsers()
          this.closeDialog()
          displayMessage(""+ res.data, "success" , false);
        })
        .catch( err => {
          displayMessage("Problemas al actualizar el Usuario" , "error" , true);
        });
      },
      deleteUser(user){
        swal({
        title: "¿Está seguro de eliminar el Usuario?",
        text: "Una vez eliminado, no podrá recuperar el registro.",
        icon: "warning",
        buttons: ["Cancelar","Aceptar"]
        })
        .then((willDelete)=>{
          if(willDelete){
            UsersServices.delete(user.id)
            .then( res => {
              this.getUsers()
              this.closeDialog()
              displayMessage(""+ res.data , "success" , false);
            })
            .catch( err => {
              displayMessage("Problemas al eliminar el Usuario" , "error" , true);
            });
          }
        });
      },
      getFormUser(data,method){
        let formUser = new FormData();
        formUser.append('id', this.dataUser.id);
        formUser.append('nombre_completo', this.dataUser.nombre_completo);
        formUser.append('email', this.dataUser.email);
        formUser.append('rol_id', this.dataUser.rol_id);
        formUser.append('password', this.dataUser.password);
        formUser.append('foto_url', this.dataUser.foto_url);
        formUser.append('_method', method);
        return formUser;
      },
      editUser (user) {
        this.editedIndex = this.users.indexOf(user)
        this.dataUser.id = user.id
        this.dataUser.nombre_completo = user.nombre_completo
        this.dataUser.email = user.email
        this.dataUser.rol_id = parseInt(user.rol_id)
        this.dataUser.foto_url = user.foto_url
        this.ImgPreview = this.dataUser.foto_url;
        this.dialog = true
      },
      closeDialog () {
        this.dialog = false
        setTimeout(() => {
          this.dataUser = Object.assign({}, this.defaultUser)
          this.ImgPreview = '/'
          this.editedIndex = -1
        }, 300)
      },
      saveUser () {
        if(this.validateForm()){
          if (this.editedIndex > -1) {
            this.updateProducto()
          } else {
            this.storeProducto()
          }
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