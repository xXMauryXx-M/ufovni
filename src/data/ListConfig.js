const { ConfigMapScreen } = require("../Screen/confApp/ConfigMapScreen");
const { PerfilScreen } = require("../Screen/confApp/PerfilScreen");
const { ThemeScreen } = require("../Screen/confApp/ThemeScreen");

 export  const AjustesItem=[
    
    {
        name:"Theme",
        componet:"ThemeScreen",
        icon:"contrast-outline"
    },
    {
        name:"Cuenta",
        componet:"PerfilScreen",
        icon:"person-outline"
    },
    {
        name:"configuracion mapa",
        componet:"ConfigMapScreen",
        icon:"navigate-outline"
    }
]