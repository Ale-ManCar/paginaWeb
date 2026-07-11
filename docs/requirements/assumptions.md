# Supuestos de descubrimiento

Estado: provisionales hasta validación del propietario del negocio.

| Decisión     | Supuesto inicial                                          | Impacto                                                        |
| ------------ | --------------------------------------------------------- | -------------------------------------------------------------- |
| Nombre       | Grupo 1 Store                                             | Nombre temporal, reemplazable desde configuración.             |
| País         | Ecuador                                                   | Determina fiscalidad, pagos y logística.                       |
| Moneda       | USD, una sola moneda                                      | Simplifica precios y conciliación inicial.                     |
| Productos    | Bienes físicos                                            | Requiere inventario, envío y devoluciones.                     |
| Variantes    | SKU, precio, imagen y stock por variante                  | Evita rediseñar inventario más adelante.                       |
| Pago         | Adaptador desacoplado; PayPhone como candidato            | No se activa sin contrato y credenciales reales.               |
| Envío        | Retiro y tarifas configurables por zona                   | Un transportista externo podrá añadirse por adaptador.         |
| Impuestos    | Motor configurable; IVA inicial 15%                       | Debe validarlo un responsable tributario antes de producción.  |
| Facturación  | Puerto para integración SRI                               | No se emitirán comprobantes reales sin firma y datos fiscales. |
| Correo       | Resend en producción; Mailpit local                       | El dominio debe verificar SPF y DKIM.                          |
| Dominio      | No definido                                               | Bloquea HTTPS público y correo autenticado.                    |
| Hosting      | VPS administrado con contenedores                         | Decisión reversible; falta presupuesto.                        |
| Devoluciones | Solicitud dentro de 15 días, sujeta a aprobación          | Debe reemplazarse por política legal/comercial aprobada.       |
| Inventario   | Reserva de 15 minutos; sin sobreventa                     | Reduce competencia por la última unidad.                       |
| Promociones  | Porcentaje, importe fijo y envío gratuito; no acumulables | Alcance inicial acotado y ampliable.                           |

No se implementarán pagos, reglas fiscales finales, facturación ni tarifas reales de envío hasta validar sus respectivos supuestos.
