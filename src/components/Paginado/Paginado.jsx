import React from 'react'
import vectorDerecho from "../../assetsOficial/vectorDerecho.svg"
import vectorIzquierdo from "../../assetsOficial/vectorIzquierdo.svg"

const Paginado = ({pagina, setPagina, maximo, style}) => {
    const [input, setInput] = React.useState(1); //creo el estado input para setearle el valor a la etiqueta input
    
    const nextPage =() => { // funcion para para setear el input y la pagina para avanzar a la siguiente pagina
        setInput(parseInt(input) + 1); //parseInt para que siempre sea un numero
        setPagina(parseInt(pagina) + 1);
    }
    
    const prevPage = () => { // funcion para setear el input y la pagina para retroceder a la pagina anterior
        setInput(parseInt(input) - 1);
        setPagina(parseInt(pagina) - 1);
    }

    const firstPage = () => { // funcion para setear el input y la pagina para ir a la primera pagina
        setInput(1);
        setPagina(1);
    }

    const lastPage = () => { // funcion para setear el input y la pagina para ir a la ultima pagina
        setInput(Math.ceil(maximo));
        setPagina(Math.ceil(maximo));
    }

    const keyInput = (e) =>{
        if(e.keyCode === 13){
            setPagina(parseInt(e.target.value));
            if( parseInt(e.target.value) < 1 ||  //validaciones para cuando se setea la pagina no sea un numero negativo
                parseInt(e.target.value) > Math.ceil(maximo) ||// o mayor al maximo de paginas
                isNaN(parseInt(e.target.value))//o no sea un numero
                ){
                    setPagina(1);// setea la pagina a 1
                setInput(1);//y el input a 1
            }else{
                setPagina(parseInt(e.target.value)); //si no setea la pagina a la pagina que se ingreso en el input
        }
    }
};
    const onChange = (e) => { //cambia el valor del input de la pagina
        setInput(e.target.value);
    }
    
    return (
        <div className={style.containerPaginado}>
            
            <button className={style.btnPaginado} disabled={pagina <= 1} onClick={firstPage}>
                <img src={vectorIzquierdo} alt="vectorIzquierdo" />
                <img src={vectorIzquierdo} alt="vectorIzquierdo" />
            </button>

            &nbsp;
            

            <button className={style.btnPaginado} disabled={pagina <= 1} onClick={prevPage}>
                <img src={vectorIzquierdo} alt="vectorIzquierdo" />
            </button>

            <input className={style.contPaginado} onChange={(e) => onChange(e)} onKeyDown={e => keyInput(e)} name="pagina" autoComplete="off" value={input} />
            {/* <p className={style.textPaginado}> de {Math.ceil(maximo)}</p> */}
            
            <button className={style.btnPaginado} disabled={pagina >= Math.ceil(maximo)} onClick={nextPage}>
                <img src={vectorDerecho} alt="vectorDerecho" />
            </button>

            &nbsp;

            <button className={style.btnPaginado} disabled={pagina >= Math.ceil(maximo)} onClick={lastPage}>
                <img src={vectorDerecho} alt="vectorDerecho" />
                <img src={vectorDerecho} alt="vectorDerecho" />
            </button>
            
        </div>
    )
}

export default Paginado