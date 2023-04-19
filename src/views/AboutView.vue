<template>
  <v-container>
    <v-row justify="center" class="white--text">
      <v-col cols="8">
        <h1 class="text-center font-weight-bold uni-sans-heavy my-5">Sobre Lonjas.org</h1>

        <p>
          lonjas es una aplicación enfocada al almacenamiento y clasificación de material multimedia producido por artistas a lo largo de internet.
          Nuestro objetivo principal es proporcionar a los usuarios una forma fácil y accesible de descubrir y explorar el trabajo de artistas pequeños
          y emergentes, permitiendo filtrar dibujos según sus personajes favoritos y ofreciendo una amplia variedad de contenido.
        </p>

        <p>
          Creemos en la importancia de apoyar y fomentar la creatividad y la innovación, por lo que estamos comprometidos en promover a artistas de todos
          los niveles y estilos, ofreciendo una plataforma inclusiva y diversa para compartir su trabajo.
        </p>

        <p>
          Además, nos esforzamos por mantener altos estándares de calidad y seguridad en nuestro sitio web, respetando la protección de los
          derechos de autor de los artistas junto a su privacidad.
        </p>

      <v-divider class="ma-10" dark/>

        <h1 class="text-center font-weight-bold uni-sans-heavy my-5">Reglas de Contenido:</h1>

        <div>
          <p class="text-25 font-weight-bold text-start">1. Uso del Servicio:</p>
          <p>
            Lonjas es una pagina orientada a mostrar dibujos de artistas desde otras redes sociales. Todo el material en esta pagina proviene
            directamente de las redes sociales de dichos artistas y no resubido desde un tercero.
          </p>
        </div>

        <br>

        <div>
          <p class="text-25 font-weight-bold text-start">2. Propiedad Intelectual del Artista:</p>
          <p>
            El artista retiene la propiedad de sus dibujos y conserva todos los derechos de autor sobre su contenido. Lonjas nunca usará el material
            de los artistas con fines comerciales bajo ninguna circunstancia, de la misma forma, Lonjas nunca publicará material pago de un artista
            sin que este haya sido publicado por el mismo personalmente. Aún así, el artista tiene la opción de pedir que sus dibujos no sean
            mostrados en nuestra pagina contactando con nosotros via <a>Twitter</a>.
          </p>
        </div>

        <br>

        <div>
          <p class="text-25 font-weight-bold">3. Reglas de contenido:</p>
          <p>
            Nos reservamos el derecho de retirar de nuestra pagina cualquier material que consideremos inapropiado, ilegal, que infrinja los
            derechos de autor de terceros y que promueva o ataque cualquier tipo de ideología politica. Así mismo, tenemos una regla de
            poca tolerancia al material adulterado, editado o generado artificialmente.
          </p>
        </div>

        <br>

        <div>
          <p class="text-25 font-weight-bold">4. Responsabilidad:</p>
          <p>
            Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Cualquier modificación será efectiva
            inmediatamente después de su publicación en nuestra página web. Al continuar utilizando nuestro servicio después de la publicación
            de las modificaciones, usted acepta los términos y condiciones actualizados.
          </p>
        </div>

      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {Component, Ref, Vue} from 'vue-property-decorator'
import Rules from "@/service/tool/Rules"
import {getModule} from "vuex-module-decorators"
import DialogModule from "@/store/DialogModule"
import Dialog from "@/model/vue/Dialog"

@Component
export default class AboutView extends Vue {

  @Ref() readonly form!: HTMLFormElement

  get rules() { return Rules }

  validate() {
    getModule(DialogModule).showDialog(new Dialog("Aviso", "¿Desea continuar?", () => {
      alert("Has continuado.")
    }))
  }

}
</script>