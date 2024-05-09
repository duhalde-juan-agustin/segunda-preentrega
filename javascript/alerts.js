document.addEventListener('DOMContentLoaded', function() {
    const formularioCompra = document.getElementById('formulario-compra');

    formularioCompra.addEventListener('submit', function(event) {
        event.preventDefault();

        swal({
            title: "¿Estás seguro de realizar la compra?",
            text: "Se procederá con el pago de los productos seleccionados.",
            icon: "warning",
            buttons: ["Cancelar", "Aceptar"],
            dangerMode: true,
        })
        .then((aceptar) => {
            if (aceptar) {
                fetch('https://my-server-url.com/compra', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        nombre: formularioCompra.nombre.value,
                        apellido: formularioCompra.apellido.value,
                        email: formularioCompra.email.value,
                        tarjeta: formularioCompra.tarjeta.value,
                        fecha: formularioCompra.fecha.value,
                        cvv: formularioCompra.cvv.value,
                        total: parseFloat(document.getElementById('total').textContent),
                        productos: JSON.parse(localStorage.getItem('productos')) || [],
                    }),
                })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Error en la solicitud');
                    }
                })
                .then(data => {
                    swal("¡Compra realizada correctamente!", {
                        icon: "success",
                    });
                    formularioCompra.reset(); // Reinicia el formulario después de aceptar la compra
                })
                .catch(error => {
                    console.error('Error:', error);
                    swal("Error al realizar la compra. Por favor, inténtalo de nuevo más tarde.", {
                        icon: "error",
                    });
                });
            } else {
                swal("Compra cancelada", {
                    icon: "error",
                });
            }
        });
    });
});
