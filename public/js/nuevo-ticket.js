const botonTicket = document.getElementById('botonTicket')
const lblTicket = document.getElementById('lblNuevoTicket')

console.log('Nuevo Ticket HTML');

const socket = io()

socket.on('connect', ()=>{
    botonTicket.disabled = false
})

socket.on('disconnect', ()=>{
    botonTicket.disabled = true
})

socket.on('ultimo-ticket', (payload)=>{
    lblTicket.innerText = `Ticket ${payload}`
})

botonTicket.addEventListener('click', ()=>{

    socket.emit('siguiente-ticket', null, (ticket)=>{
        //console.log(`recibiendo ticket ${ticket}`)
        lblTicket.innerText = ticket
    })

})