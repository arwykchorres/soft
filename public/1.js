(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/dashboard/usuarios/index.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/dashboard/usuarios/index.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_UsersServices_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../services/UsersServices.js */ "./resources/js/services/UsersServices.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'Index',
  data: function data() {
    return {
      //rules
      nombreCompletoRules: [function (v) {
        return !!v || 'El campo es requerido';
      }, function (v) {
        return v.length >= 3 || 'El nombre debe tener como minimo 3 caracteres';
      }],
      emailRules: [function (v) {
        return !!v || 'El campo es requerido';
      }, function (v) {
        return v.length >= 6 || 'El email debe tener como minimo 6 caracteres';
      }, function (v) {
        return /.+@.+/.test(v) || 'E-mail no es válido';
      }],
      passwordRules: [function (v) {
        return !!v || 'El campo es requerido';
      }, function (v) {
        return v.length >= 6 || 'El password debe tener como minimo 6 caracteres';
      }],
      fotoRules: [function (v) {
        return !!v || 'El campo es requerido';
      }],
      validarForm: true,
      //Data
      defaultNameImg: 'Imagen',
      ImgPreview: '/',
      search: '',
      dialog: false,
      pagination: {
        sortBy: 'updated_at',
        descending: 'true'
      },
      rowsPerPageItems: [5, 10, 25, {
        "text": "$vuetify.dataIterator.rowsPerPageAll",
        "value": -1
      }],
      headers: [{
        text: 'id',
        value: 'id',
        align: 'center',
        sortable: false,
        class: "d-none"
      }, {
        text: 'Nombre Completo',
        value: 'nombre_completo',
        align: 'center'
      }, {
        text: 'Email',
        value: 'email',
        align: 'center'
      }, {
        text: 'Rol',
        value: 'rol_id',
        align: 'center'
      }, {
        text: 'foto',
        value: 'foto_url',
        align: 'center',
        sortable: false
      }, {
        text: 'updated_at',
        value: 'updated_at',
        align: 'center',
        class: "d-none"
      }, {
        text: 'Actions',
        value: 'actions',
        align: 'center',
        sortable: false
      }],
      users: [],
      roles: [],
      editedIndex: -1,
      dataUser: {
        id: '',
        nombre_completo: '',
        email: '',
        rol_id: 1,
        password: '',
        foto_url: ''
      },
      defaultUser: {
        id: '',
        nombre_completo: '',
        email: '',
        rol_id: 1,
        password: '',
        foto_url: ''
      }
    };
  },
  beforeCreate: function beforeCreate() {
    if (!this.$store.getters.authenticatedUser) {
      this.$router.push({
        name: 'Login'
      });
    }
  },
  created: function created() {
    this.getUsers();
    this.getListSelectRoles();
  },
  computed: {
    formTitle: function formTitle() {
      return this.editedIndex === -1 ? 'Nuevo Usuario' : 'Editar Usuario';
    }
  },
  watch: {
    dialog: function dialog(val) {
      val || this.closeDialog();
    },
    editedIndex: function editedIndex() {
      //debido a que el password al crear es requerido, al editar no lo es
      this.editedIndex === -1 ? this.passwordRules = [function (v) {
        return !!v || 'El campo es requerido';
      }, function (v) {
        return v.length >= 6 || 'El password debe tener como minimo 6 caracteres';
      }] : this.passwordRules = [];
    },
    'dataUser.password': function dataUserPassword() {
      //Para validar el password
      if (this.editedIndex !== -1) {
        if (this.dataUser.password.length > 0) {
          this.passwordRules = [function (v) {
            return v.length >= 6 || 'El password debe tener como minimo 6 caracteres';
          }];
        } else {
          this.passwordRules = [];
        }
      }
    }
  },
  methods: {
    validateForm: function validateForm() {
      if (this.$refs.form.validate()) {
        return true;
      }

      return false;
    },
    fileSelected: function fileSelected(e) {
      //2000000 2mb
      var files = e.target.files || e.dataTransfer.files;
      var auxFile = files;
      var allowedExtensions = /(.jpg|.jpeg|.png)$/i;

      if (!files.length || files[0].size > 2000000 || !allowedExtensions.exec(auxFile[0].name)) {
        displayMessage("Seleccine una imagen", "error", true);
        return;
      }

      this.dataUser.foto_url = files[0];
      this.displayImgPreview(files[0], false);
    },
    displayImgPreview: function displayImgPreview(imgPath, exist) {
      var reader = new FileReader(); //si la imagen no existe en el servidor

      if (!exist) {
        reader.onload = function (e) {
          this.ImgPreview = e.target.result;
        }.bind(this);

        reader.readAsDataURL(imgPath);
      } //Si la img existe en el servidor
      else {
          ImgPreview.src = imgPath;
        }
    },
    getListSelectRoles: function getListSelectRoles() {
      var _this = this;

      _services_UsersServices_js__WEBPACK_IMPORTED_MODULE_0__["default"].getListSelectRoles().then(function (res) {
        _this.roles = res.data;
      }).catch(function (err) {
        console.log("error getProductos");
      });
    },
    getUsers: function getUsers() {
      var _this2 = this;

      _services_UsersServices_js__WEBPACK_IMPORTED_MODULE_0__["default"].getUsers().then(function (res) {
        _this2.users = res.data.data;
      }).catch(function (err) {
        displayMessage("Problemas al cargar los usuarios", "error", true);
      });
    },
    storeProducto: function storeProducto() {
      var _this3 = this;

      _services_UsersServices_js__WEBPACK_IMPORTED_MODULE_0__["default"].store(this.getFormUser(this.dataUser, 'POST')).then(function (res) {
        _this3.getUsers();

        _this3.closeDialog();

        displayMessage("" + res.data, "success", false);
      }).catch(function (err) {
        displayMessage("Problemas al crear el Usuario", "error", true);
      });
    },
    updateProducto: function updateProducto() {
      var _this4 = this;

      _services_UsersServices_js__WEBPACK_IMPORTED_MODULE_0__["default"].update(this.dataUser.id, this.getFormUser(this.dataUser, 'PUT')).then(function (res) {
        _this4.getUsers();

        _this4.closeDialog();

        displayMessage("" + res.data, "success", false);
      }).catch(function (err) {
        displayMessage("Problemas al actualizar el Usuario", "error", true);
      });
    },
    deleteUser: function deleteUser(user) {
      var _this5 = this;

      swal({
        title: "¿Está seguro de eliminar el Usuario?",
        text: "Una vez eliminado, no podrá recuperar el registro.",
        icon: "warning",
        buttons: ["Cancelar", "Aceptar"]
      }).then(function (willDelete) {
        if (willDelete) {
          _services_UsersServices_js__WEBPACK_IMPORTED_MODULE_0__["default"].delete(user.id).then(function (res) {
            _this5.getUsers();

            _this5.closeDialog();

            displayMessage("" + res.data, "success", false);
          }).catch(function (err) {
            displayMessage("Problemas al eliminar el Usuario", "error", true);
          });
        }
      });
    },
    getFormUser: function getFormUser(data, method) {
      var formUser = new FormData();
      formUser.append('id', this.dataUser.id);
      formUser.append('nombre_completo', this.dataUser.nombre_completo);
      formUser.append('email', this.dataUser.email);
      formUser.append('rol_id', this.dataUser.rol_id);
      formUser.append('password', this.dataUser.password);
      formUser.append('foto_url', this.dataUser.foto_url);
      formUser.append('_method', method);
      return formUser;
    },
    editUser: function editUser(user) {
      this.editedIndex = this.users.indexOf(user);
      this.dataUser.id = user.id;
      this.dataUser.nombre_completo = user.nombre_completo;
      this.dataUser.email = user.email;
      this.dataUser.rol_id = parseInt(user.rol_id);
      this.dataUser.foto_url = user.foto_url;
      this.ImgPreview = this.dataUser.foto_url;
      this.dialog = true;
    },
    closeDialog: function closeDialog() {
      var _this6 = this;

      this.dialog = false;
      setTimeout(function () {
        _this6.dataUser = Object.assign({}, _this6.defaultUser);
        _this6.ImgPreview = '/';
        _this6.editedIndex = -1;
      }, 300);
    },
    saveUser: function saveUser() {
      if (this.validateForm()) {
        if (this.editedIndex > -1) {
          this.updateProducto();
        } else {
          this.storeProducto();
        }
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/dashboard/usuarios/index.vue?vue&type=style&index=0&id=f519c2bc&scoped=true&lang=css&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/dashboard/usuarios/index.vue?vue&type=style&index=0&id=f519c2bc&scoped=true&lang=css& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.jbtn-file[data-v-f519c2bc] {\n  cursor: pointer;\n  position: relative;\n  overflow: hidden;\n}\n.jbtn-file input[type=file][data-v-f519c2bc] {\n  position: absolute;\n  top: 0;\n  right: 0;\n  min-width: 100%;\n  min-height: 100%;\n  text-align: right;\n  filter: alpha(opacity=0);\n  opacity: 0;\n  outline: none;\n  cursor: inherit;\n  display: block;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/dashboard/usuarios/index.vue?vue&type=style&index=0&id=f519c2bc&scoped=true&lang=css&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/dashboard/usuarios/index.vue?vue&type=style&index=0&id=f519c2bc&scoped=true&lang=css& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader??ref--6-1!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--6-2!../../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=style&index=0&id=f519c2bc&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/dashboard/usuarios/index.vue?vue&type=style&index=0&id=f519c2bc&scoped=true&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/dashboard/usuarios/index.vue?vue&type=template&id=f519c2bc&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/dashboard/usuarios/index.vue?vue&type=template&id=f519c2bc&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-flex",
    { attrs: { xs12: "", md12: "", "mt-4": "" } },
    [
      _c(
        "v-card",
        [
          _c(
            "v-card-title",
            [
              _c(
                "v-layout",
                {
                  staticClass: "blue-gradient card-title-out",
                  attrs: { row: "", "justify-space-between": "", wrap: "" }
                },
                [
                  _c("v-flex", { attrs: { xs12: "", sm2: "", md2: "" } }),
                  _vm._v(" "),
                  _c(
                    "v-flex",
                    {
                      attrs: {
                        xs12: "",
                        sm2: "",
                        md2: "",
                        "d-flex": "",
                        "align-self-center": ""
                      }
                    },
                    [_c("h3", [_vm._v(" Usuarios ")])]
                  ),
                  _vm._v(" "),
                  _c(
                    "v-flex",
                    { attrs: { xs12: "", sm2: "", md2: "" } },
                    [
                      _c(
                        "v-btn",
                        {
                          attrs: {
                            fab: "",
                            dark: "",
                            small: "",
                            color: "green darken-2"
                          },
                          on: {
                            click: function($event) {
                              _vm.dialog = true
                            }
                          }
                        },
                        [
                          _c("v-icon", { attrs: { dark: "" } }, [_vm._v("add")])
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-card-text",
            [
              _c(
                "v-card",
                [
                  _c(
                    "v-card-title",
                    [
                      _c("v-spacer"),
                      _vm._v(" "),
                      _c("v-text-field", {
                        attrs: {
                          "append-icon": "search",
                          label: "Search",
                          "single-line": "",
                          "hide-details": "",
                          color: "primary"
                        },
                        model: {
                          value: _vm.search,
                          callback: function($$v) {
                            _vm.search = $$v
                          },
                          expression: "search"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("v-divider", {
                    staticStyle: { "border-top-width": "2px" }
                  }),
                  _vm._v(" "),
                  _c(
                    "v-data-table",
                    {
                      staticClass: "elevation-1",
                      attrs: {
                        headers: _vm.headers,
                        items: _vm.users,
                        "rows-per-page-items": _vm.rowsPerPageItems,
                        search: _vm.search,
                        "rows-per-page-text": "Filas por página",
                        pagination: _vm.pagination
                      },
                      on: {
                        "update:pagination": function($event) {
                          _vm.pagination = $event
                        }
                      },
                      scopedSlots: _vm._u([
                        {
                          key: "items",
                          fn: function(props) {
                            return [
                              _c("td", { staticClass: "d-none" }),
                              _vm._v(" "),
                              _c("td", { staticClass: "text-xs-center" }, [
                                _vm._v(_vm._s(props.item.nombre_completo))
                              ]),
                              _vm._v(" "),
                              _c("td", { staticClass: "text-xs-center" }, [
                                _vm._v(_vm._s(props.item.email))
                              ]),
                              _vm._v(" "),
                              _c("td", { staticClass: "text-xs-center" }, [
                                _vm._v(_vm._s(props.item.rol.display_name))
                              ]),
                              _vm._v(" "),
                              _c(
                                "td",
                                { staticClass: "text-xs-center" },
                                [
                                  _c(
                                    "v-list-tile-avatar",
                                    {
                                      staticStyle: {
                                        display: "inline !important"
                                      }
                                    },
                                    [
                                      _c("img", {
                                        attrs: { src: props.item.foto_url }
                                      })
                                    ]
                                  )
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c("td", { staticClass: "d-none" }),
                              _vm._v(" "),
                              _c(
                                "td",
                                { staticClass: "justify-center layout px-0" },
                                [
                                  _c(
                                    "v-btn",
                                    {
                                      attrs: {
                                        flat: "",
                                        icon: "",
                                        color: "warning"
                                      },
                                      on: {
                                        click: function($event) {
                                          return _vm.editUser(props.item)
                                        }
                                      }
                                    },
                                    [_c("v-icon", [_vm._v("edit")])],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-btn",
                                    {
                                      attrs: {
                                        flat: "",
                                        icon: "",
                                        color: "red darken-1"
                                      },
                                      on: {
                                        click: function($event) {
                                          return _vm.deleteUser(props.item)
                                        }
                                      }
                                    },
                                    [_c("v-icon", [_vm._v("delete")])],
                                    1
                                  )
                                ],
                                1
                              )
                            ]
                          }
                        },
                        {
                          key: "pageText",
                          fn: function(props) {
                            return [
                              _vm._v(
                                "\r\n            Registros " +
                                  _vm._s(props.pageStart) +
                                  " - " +
                                  _vm._s(props.pageStop) +
                                  " de " +
                                  _vm._s(props.itemsLength) +
                                  "\r\n          "
                              )
                            ]
                          }
                        }
                      ])
                    },
                    [
                      _vm._v(" "),
                      _c(
                        "template",
                        { slot: "no-data" },
                        [
                          _c(
                            "v-layout",
                            {
                              attrs: {
                                row: "",
                                "justify-space-between": "",
                                wrap: ""
                              }
                            },
                            [
                              _c(
                                "v-flex",
                                {
                                  attrs: {
                                    xs12: "",
                                    sm2: "",
                                    md10: "",
                                    "d-flex": "",
                                    "align-self-center": ""
                                  }
                                },
                                [
                                  _c("h4", { staticClass: "text-xs-center" }, [
                                    _vm._v("No hay datos disponibles")
                                  ])
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "v-flex",
                                { attrs: { xs12: "", sm2: "", md2: "" } },
                                [
                                  _c(
                                    "v-btn",
                                    {
                                      attrs: {
                                        color: "warning",
                                        fab: "",
                                        dark: "",
                                        small: "",
                                        title: "Recargar"
                                      },
                                      on: { click: _vm.getUsers }
                                    },
                                    [_c("v-icon", [_vm._v("refresh")])],
                                    1
                                  )
                                ],
                                1
                              )
                            ],
                            1
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _vm._v(" "),
                      _c("template", { slot: "no-results" }, [
                        _c("h4", { staticClass: "text-xs-center" }, [
                          _vm._v(
                            'Su búsqueda como "' +
                              _vm._s(_vm.search) +
                              '" no encontró resultados.'
                          )
                        ])
                      ])
                    ],
                    2
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-dialog",
        {
          attrs: { persistent: "", "max-width": "500px" },
          model: {
            value: _vm.dialog,
            callback: function($$v) {
              _vm.dialog = $$v
            },
            expression: "dialog"
          }
        },
        [
          _c(
            "v-card",
            [
              _c(
                "v-card-title",
                { staticClass: "justify-center layout px-0" },
                [
                  _c("span", { staticClass: "headline" }, [
                    _vm._v(_vm._s(_vm.formTitle))
                  ])
                ]
              ),
              _vm._v(" "),
              _c("v-divider", { staticClass: "mx-2" }),
              _vm._v(" "),
              _c(
                "v-card-text",
                [
                  _c(
                    "v-container",
                    { attrs: { "grid-list-md": "" } },
                    [
                      _c(
                        "v-form",
                        {
                          ref: "form",
                          attrs: { "lazy-validation": "" },
                          model: {
                            value: _vm.validarForm,
                            callback: function($$v) {
                              _vm.validarForm = $$v
                            },
                            expression: "validarForm"
                          }
                        },
                        [
                          _c(
                            "v-layout",
                            { attrs: { wrap: "" } },
                            [
                              _c(
                                "v-flex",
                                { attrs: { xs12: "", sm6: "", md12: "" } },
                                [
                                  _c("v-text-field", {
                                    attrs: {
                                      label: "Nombre Completo * ",
                                      rules: _vm.nombreCompletoRules
                                    },
                                    model: {
                                      value: _vm.dataUser.nombre_completo,
                                      callback: function($$v) {
                                        _vm.$set(
                                          _vm.dataUser,
                                          "nombre_completo",
                                          $$v
                                        )
                                      },
                                      expression: "dataUser.nombre_completo"
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-flex",
                                { attrs: { xs12: "", sm6: "", md12: "" } },
                                [
                                  _c("v-text-field", {
                                    attrs: {
                                      label: "Email * ",
                                      rules: _vm.emailRules
                                    },
                                    model: {
                                      value: _vm.dataUser.email,
                                      callback: function($$v) {
                                        _vm.$set(_vm.dataUser, "email", $$v)
                                      },
                                      expression: "dataUser.email"
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-flex",
                                { attrs: { xs12: "", sm6: "", md12: "" } },
                                [
                                  _c("v-text-field", {
                                    attrs: {
                                      label:
                                        _vm.editedIndex === -1
                                          ? "Password *"
                                          : "Password",
                                      type: "password",
                                      hint:
                                        this.editedIndex === -1
                                          ? ""
                                          : "Dejar en blanco si no quieres cambiar la contraseña",
                                      rules: _vm.passwordRules
                                    },
                                    model: {
                                      value: _vm.dataUser.password,
                                      callback: function($$v) {
                                        _vm.$set(_vm.dataUser, "password", $$v)
                                      },
                                      expression: "dataUser.password"
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-flex",
                                { attrs: { xs12: "", sm6: "", md5: "" } },
                                [
                                  _c("v-select", {
                                    attrs: {
                                      items: _vm.roles,
                                      "item-text": "display_name",
                                      "item-value": "id",
                                      label: "Rol"
                                    },
                                    model: {
                                      value: _vm.dataUser.rol_id,
                                      callback: function($$v) {
                                        _vm.$set(_vm.dataUser, "rol_id", $$v)
                                      },
                                      expression: "dataUser.rol_id"
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-flex",
                                {
                                  attrs: {
                                    xs12: "",
                                    sm6: "",
                                    md2: "",
                                    "d-flex": "",
                                    "justify-space-between": "",
                                    "align-center": ""
                                  }
                                },
                                [
                                  _vm._v(
                                    "\r\n              Foto* :\r\n              "
                                  ),
                                  _c("v-text-field", {
                                    staticClass: "d-none",
                                    attrs: { rules: _vm.fotoRules },
                                    model: {
                                      value: _vm.dataUser.foto_url,
                                      callback: function($$v) {
                                        _vm.$set(_vm.dataUser, "foto_url", $$v)
                                      },
                                      expression: "dataUser.foto_url"
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-flex",
                                {
                                  attrs: {
                                    xs12: "",
                                    sm6: "",
                                    md2: "",
                                    "d-flex": "",
                                    "justify-space-between": "",
                                    "align-center": ""
                                  }
                                },
                                [
                                  _c("div"),
                                  _vm._v(" "),
                                  _c("img", {
                                    staticStyle: {
                                      "max-width": "40px",
                                      "max-height": "40px"
                                    },
                                    attrs: {
                                      id: "img-preview",
                                      src: _vm.ImgPreview
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c("div")
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "v-flex",
                                {
                                  attrs: {
                                    xs12: "",
                                    sm6: "",
                                    md2: "",
                                    "d-flex": "",
                                    "justify-space-between": "",
                                    "align-center": ""
                                  }
                                },
                                [
                                  _c(
                                    "div",
                                    {
                                      staticClass:
                                        "v-btn v-btn--floating v-btn--small jbtn-file"
                                    },
                                    [
                                      _c("v-icon", [_vm._v("cloud_upload")]),
                                      _vm._v(" "),
                                      _c("input", {
                                        attrs: { type: "file" },
                                        on: { change: _vm.fileSelected }
                                      })
                                    ],
                                    1
                                  )
                                ]
                              )
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-card-actions",
                [
                  _c("v-spacer"),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      attrs: { color: "blue darken-1", round: "", flat: "" },
                      on: { click: _vm.closeDialog }
                    },
                    [_vm._v("Cancel")]
                  ),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      attrs: { color: "blue darken-1", round: "", flat: "" },
                      on: { click: _vm.saveUser }
                    },
                    [_vm._v("Save")]
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "./resources/js/services/UsersServices.js":
/*!************************************************!*\
  !*** ./resources/js/services/UsersServices.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var apiClient = axios.create({
  //baseURL: 'http://macasoft.test/',
  headers: {
    Accept: 'aplication/json',
    'Content-Type': 'aplication/json'
  }
});
/* harmony default export */ __webpack_exports__["default"] = ({
  getUsers: function getUsers() {
    return apiClient.get('/api/datatables/users');
  },
  store: function store(user) {
    return apiClient.post('/api/admin/users', user);
  },
  update: function update(id, user) {
    //la ruta es post, en vez de put porque se envia un FormData
    return apiClient.post('/api/admin/users/' + id, user);
  },
  delete: function _delete(id) {
    return apiClient.delete('/api/admin/users/' + id);
  },
  getListSelectRoles: function getListSelectRoles() {
    return apiClient.get('/api/admin/roles/list');
  }
});

/***/ }),

/***/ "./resources/js/views/dashboard/usuarios/index.vue":
/*!*********************************************************!*\
  !*** ./resources/js/views/dashboard/usuarios/index.vue ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_vue_vue_type_template_id_f519c2bc_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=f519c2bc&scoped=true& */ "./resources/js/views/dashboard/usuarios/index.vue?vue&type=template&id=f519c2bc&scoped=true&");
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ "./resources/js/views/dashboard/usuarios/index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _index_vue_vue_type_style_index_0_id_f519c2bc_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.vue?vue&type=style&index=0&id=f519c2bc&scoped=true&lang=css& */ "./resources/js/views/dashboard/usuarios/index.vue?vue&type=style&index=0&id=f519c2bc&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_f519c2bc_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _index_vue_vue_type_template_id_f519c2bc_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "f519c2bc",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/dashboard/usuarios/index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/dashboard/usuarios/index.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./resources/js/views/dashboard/usuarios/index.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/dashboard/usuarios/index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/dashboard/usuarios/index.vue?vue&type=style&index=0&id=f519c2bc&scoped=true&lang=css&":
/*!******************************************************************************************************************!*\
  !*** ./resources/js/views/dashboard/usuarios/index.vue?vue&type=style&index=0&id=f519c2bc&scoped=true&lang=css& ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_f519c2bc_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader??ref--6-1!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--6-2!../../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=style&index=0&id=f519c2bc&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/dashboard/usuarios/index.vue?vue&type=style&index=0&id=f519c2bc&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_f519c2bc_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_f519c2bc_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_f519c2bc_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_f519c2bc_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_f519c2bc_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/views/dashboard/usuarios/index.vue?vue&type=template&id=f519c2bc&scoped=true&":
/*!****************************************************************************************************!*\
  !*** ./resources/js/views/dashboard/usuarios/index.vue?vue&type=template&id=f519c2bc&scoped=true& ***!
  \****************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_f519c2bc_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=template&id=f519c2bc&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/dashboard/usuarios/index.vue?vue&type=template&id=f519c2bc&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_f519c2bc_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_f519c2bc_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);