import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    navbar:{
        backgroundColor:'#203040',
        '&a':{
            color:"#ffffff",
            marginleft:10,
        },
    },
    brand:{
        fontWeight:'bold',
        fontSize:'1.5rem',
    },
    grow:{
        flexGrow:1,
    },
    main:{
        minHeight:'80vh',
    },
    footer:{
        marginTop:20,
        marginBottom:20,
        textAlign:'center'
    },
    section:{
        marginTop:10,
        marginBottom:10,
    },
    form:{
        width: '100%',
        maxWidth:800,
        margin:'0 auto',
    },
    navbarButton:{
        color:'#fff000',
        textTransform:'initail',
    },
    navbarHello:{
        color:'white',
        fontWeight:'800',
        letterSpacing:'1px'
    },
    transparentBackground: {
        backgroundColor: 'transparent',
      },
    error: {
        color: '#f04040',
      },
})
export default useStyles;