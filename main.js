// Inicialización de variables
let tarjetasMostradas=0;
const d=document;
let card1=null;
let card2=null;
let primerRes=null;
let segundoRes=null;
let movimientos=0;
let aciertos=0;
let temporizador=false;
let timer=30;
let timerInicial=30;
let tiempoRegresivoId=null;

// Conexion de etiquetas
let mostrarMovimientos=d.getElementById('Move');
let mostrarAciertos=d.getElementById('pares');
let mostrarTiempo=d.getElementById('t_falta');
let final=d.querySelector('.declaracion');
let rei=d.getElementById('reiniciar');

// Generación de numeros Aleatorios
let num=[1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
num= num.sort(()=>{return Math.random()-0.5});//Math ramdom va de 0 a 1, a si que restamos 
// si quiere los valores de forma desordenada se usa -0.5 si loa quiere al reves del original
// use -1
console.log(num);

// Funciones
function contarTiempo() {
    tiempoRegresivoId=setInterval(()=>{
        timer--;
        mostrarTiempo.innerHTML=`Tiempo: ${timer} segundos`;
        if (timer==0) {
            clearInterval(tiempoRegresivoId);
            bloquearCards();
        }
    },1000);
}

function bloquearCards(){
    for (let i=0;i<=15;i++){//desabilitamos todos los botones
        let tarjeta_bloqueada=d.getElementById(i);
        tarjeta_bloqueada.innerHTML=num[i];
        tarjeta_bloqueada.disabled=true;
    }
    mostrarTiempo.innerHTML=`Se acabó el tiempo perdiste`;
    final.innerHTML=`Fallaste`;
}

function reinicio(){
    for (let i=0;i<=15;i++){//desabilitamos todos los botones
        let tarjeta_desbloqueada=d.getElementById(i);
        tarjeta_desbloqueada.innerHTML='';
        tarjeta_desbloqueada.disabled=false;
    }
    timer=31;
    movimientos=0;
    mostrarMovimientos.innerHTML=`Movimientos: ${movimientos}`;
    aciertos=0;
    mostrarAciertos.innerHTML=`Pares Encontrados: ${aciertos}`;
}

// Función principal
function mostrar(id)
{

    if (temporizador==false) {
        contarTiempo();
        temporizador=true;
    }

    tarjetasMostradas++;
    console.log(tarjetasMostradas);

    if(tarjetasMostradas==1){
        // mostrar primer numero
        card1=d.getElementById(id);//sobre la tarjeta que presionamos primero, obtenemos el id
        primerRes=num[id];//guardamos ese numero en el primer numero mostrado
        card1.innerHTML=primerRes;// dentro de ese card colocamos el numero correspondiente

        // Deshabilitar primer boton
        card1.disabled=true;
    }else if(tarjetasMostradas==2)
    {
        // mostrar segundo numero
        card2=d.getElementById(id);
        segundoRes=num[id];
        card2.innerHTML=segundoRes;

        // Deshabilitar segundo boton
        card2.disabled= true;

        // Incrementar Movimien++;
        movimientos++;
        mostrarMovimientos.innerHTML=`Movimientos: ${movimientos}`;

        if (primerRes==segundoRes) {
            // Reiniciar contador de cards mostradas
            tarjetasMostradas=0;

            // Aumneto de aciertos
            aciertos++;
            mostrarAciertos.innerHTML=`Pares Encontrados: ${aciertos}`;
            if (aciertos==8) {
                clearInterval(tiempoRegresivoId);
                final.innerHTML=`Ganaste`;
                mostrarTiempo.innerHTML=`Fantastico solo demoraste ${timerInicial-timer} segundos`;
                mostrarAciertos.innerHTML=`Pares Encontrados: ${aciertos} Felicidades!!`;
                if(movimientos==8){
                    mostrarMovimientos.innerHTML=`Movimientos: ${movimientos} No Tuviste ningún error`;
                }else if(movimientos>8 && movimientos<=12){
                    mostrarMovimientos.innerHTML=`Movimientos: ${movimientos} Tienes memoria avanzada`;
                }else if(movimientos>12 && movimientos<=18){
                    mostrarMovimientos.innerHTML=`Movimientos: ${movimientos} estas en buen nivel`;
                }else if(movimientos>18){
                    mostrarMovimientos.innerHTML=`Movimientos: ${movimientos} Practica mas!!!`;
                }
            }

        }else{
            // mostrar valores y volver a ocultar
            setTimeout(()=>{
                card1.innerHTML='';
                card2.innerHTML='';
                card1.disabled=false;
                card2.disabled=false;
                tarjetasMostradas=0;
            },1500);
        }
    }
}

// Eventos
rei.addEventListener('click',reinicio);