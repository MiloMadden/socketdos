
const lblEscritorio = document.querySelector('h1')
const boton = document.querySelector('button')
const lblTicket = document.querySelector('small')
const divAlerta = document.querySelector('.alert')
const lblPendientes = document.getElementById('lblPendientes')

const searchParams = new URLSearchParams( window.location.search )

if( !searchParams.has('escritorio') ){
    window.location = 'index.html'
    throw new Error('El escritorio es obligatorio')
}

const escritorio = searchParams.get('escritorio')

const socket = io()

lblEscritorio.innerText = `Escritorio: ${escritorio}`
divAlerta.style.display = 'none'

socket.on('connect', ()=>{
    boton.disabled = false
})

socket.on('disconect', ()=>{
    boton.disabled = true
})

socket.on('tickets-pendientes', (payload)=>{

    lblPendientes.innerText = payload

})

boton.addEventListener('click', ()=>{

    socket.emit('atender-ticket', {escritorio}, ({ok, ticket, msg})=>{
        
        if(!ok){
            lblTicket.innerText = `Nadie`
            return divAlerta.style.display = ''
        }

        lblTicket.innerText = `Ticket ${ticket.numero}`

    })

})

