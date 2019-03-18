<template>
  <v-app id="inspire">

    <!-- VTOOLBAR-->
    <v-toolbar 
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      color="blue darken-3"
      dark
      app
      fixed>
      <v-toolbar-title style="width: 300px" class="ml-0 justify-space-between">
          <v-avatar size="32px" tile>
              <img src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
                    alt="Vuetify">
          </v-avatar>
          <span class="hidden-sm-and-down">DASHBOARD</span>
          <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon class="hidden-sm-and-down" @click="logout">
        <v-icon>keyboard_tab</v-icon>
      </v-btn>

    </v-toolbar>

    <!-- SIDEBAR style="width:250px;"-->
    <v-navigation-drawer
      fixed
      :clipped="$vuetify.breakpoint.mdAndUp"
      app
      width="250"
      v-model="drawer"
      :mini-variant.sync="mini"
      >
      <v-list dense>
        <template v-for="item in navItems">
          <v-list-group
            v-if="item.children"
            v-model="item.model"
            :key="item.text"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon="">
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile 
              v-for="(child, i) in item.children"
              :key="i"
              router
              :to="{name : child.routeName }" 
              exact>
              {{ displayVListGroup(item, child)}}
              <v-list-tile-action v-if="child.icon">
                <i v-if="tipoIcono(child)" :class="child.icon"></i>
                <v-icon v-else> {{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else 
            :key="item.text" 
            router
            :to="{name : item.routeName }"
            exact>
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
        <v-divider></v-divider>
        <v-list-tile >
          <v-list-tile-action class="justify-end layout px-0">
            <v-btn  icon @click.stop="mini = !mini">
              <v-icon v-if="mini">chevron_right</v-icon>
              <v-icon v-else>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <!-- MAIN style="padding: 64px 0px 0px 250px;"-->
    <v-content fluid >
        <v-container fluid fill-height>
            <v-layout row wrap > 
                <router-view></router-view>
            </v-layout>
        </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import AuthServices from '../services/AuthServices.js';
  import nav from '../router/_nav'
  export default {
    data () {
      return {
        dialog: false,
        drawer: null,
        navItems : nav.items,
        mini: false,
      }
    },
    beforeCreate () {
      if(!this.$store.getters.authenticatedUser){
        this.$router.push({name: 'Login'});
      }
    },
    props: {
      source: String
    },
    methods: {
      displayVListGroup(item, child) {
        if(this.$route.name === child.routeName){
          item.model = true;
        }
      },
      tipoIcono(child){
        var dato = child.icon;
        if(dato.includes("fa fa-")){
          return true;
        }else{
          return false;
        }
      },
      logout(){
        AuthServices.logout()
        .then(res => {
          this.$store.commit('logout');
          this.$router.push({name: 'Login'});
        })
        .catch(err => {
          displayMessage("Problemas al cerrar sesión" , "error" , true);
        })
      }
    },
  }
</script>