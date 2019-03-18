<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" label="Email" type="text" v-model="credentials.email"></v-text-field>
                  <v-text-field prepend-icon="lock"   label="Password" type="password" v-model="credentials.password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import AuthServices from '../../services/AuthServices.js';
  export default {
    data() {
      return {
        credentials: {
          email : '',
          password: ''
        },
      }
    },
    beforeCreate () {
      if(this.$store.getters.authenticatedUser){
        this.$router.push({name: 'Usuarios'});
      }
    },
    methods: {
      login(){
        AuthServices.login(this.$data.credentials)
        .then(res => {
          this.$store.commit('loginSuccess', res.data);
          displayMessage("Bienvenido" , "success" , false);
          this.$router.push({name: 'Usuarios'});
        })
        .catch(err => {
          displayMessage("Credenciales Incorrectas" , "error" , true);
        })
      }
    }
  }
  </script>