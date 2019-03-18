export default {
  items: [
    {   
      icon: 'keyboard_arrow_up',
      'icon-alt': 'keyboard_arrow_down',
      text: 'Configuracion',
      model: false,
      children: [
        { 
          icon: 'contacts', 
          text: 'Usuarios', 
          routeName: 'Usuarios' 
        },
        { 
          icon: 'add', 
          text: 'Roles', 
          routeName: 'Roles' 
        }
      ]
    }
  ]
}
