<template>
  <Navbar/>


    <div class="titulo mt-2">
      <img class="avatar" src="../assets/tr-avatar-sun.jpg">
    </div>  


  <div class="container-xl mt-5">
    <table id="tcrud" class="table">
    <thead>
      <tr>
        <th scope="col">Ctd</th>
        <th scope="col">Producto - Cod - Precio</th>
        <th scope="col">Nombre - Rut</th>
        <th scope="col">Destino</th>
        <th scope="col">Giro</th>
        <th scope="col">C.Trib</th>
        <th scope="col">Transporte</th>
        <th scope="col">Dia</th>
        <th scope="col">Estado</th>
        <th scope="col">Acciones</th>                
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in despachos" :key="index">
        <td>{{item.cantidad}}</td>
        <td>{{item.producto}}</td>
        <td>{{item.nombre}}</td>
        <td>{{item.destino}}</td>
        <td>{{item.giro}}</td>        
        <td>{{item.comtrib}}</td>
        <td>{{item.transporte}}</td>
        <td>{{item.dia}}</td>
        <td><span class="badge bg-secondary">Pendiente</span></td>
        <td>
            <i @click.prevent="eliminarDato(item.id)"
                id="sdelete"
                class="fas fa-trash">
            </i>  
        </td>

      </tr>
    </tbody>
    </table>

            <div class="row">

            <div class="col-8"></div>
            <div class="col-4">

                <div class="float-end">

            <button type="button" 
                    class="btn btn-primary"
                    data-bs-toggle="modal" 
                    href="#despacho">
                    <i class="fas fa-plus-circle"></i> 

                  Nuevo</button>
            </div>

                </div>
            </div>



  </div>




<!-- Modal -->
<div class="modal fade" id="despacho" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Nuevo Despacho</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">

                    <form>
                      <div class="row">

                        <div class="container">

                        <textarea v-model="despacho.producto" textarea class="form-control" id="cod" rows="3" placeholder="Producto + Sku"></textarea>
                        <br>

                        <input v-model="despacho.cantidad" type="number" class="form-control" placeholder="Ctdad" required>
                        <hr>                        


                        </div>    


                        <div class="col">
                            <input v-model="despacho.nombre" type="text" class="form-control" placeholder="Nombre destinatario" required>
                            <br>
                            <input v-model="despacho.destino" type="text" class="form-control" placeholder="Destino" required> 
                            <br>                                     
                                                    
                        </div>


                        <div class="col">

                            <input v-model="despacho.comtrib" type="text" class="form-control" placeholder="C. Trib" required>
                            <br>
                            <input v-model="despacho.giro" type="text" class="form-control" placeholder="Giro" required> 
                            <br>        
                            <input v-model="despacho.transporte" type="text" class="form-control" placeholder="Transporte" required>
                            <br>
                            <label>Dia</label>
                            <select v-model="despacho.dia" class="form-control">
                              <option>Lunes</option>
                              <option>Martes</option>
                              <option>Miercoles</option>
                              <option>Jueves</option>
                              <option>Viernes</option>                        
                            </select>
                            <br><br>                            

                        </div>

                      </div>

                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button @click.prevent="agregarDato()"
                            class="btn btn-primary">Save changes
                      </button>
                    </div>                      

                    </form>
      </div>
    </div>
  </div>
</div>

</template>

<script>
import Navbar from '../components/Navbar'
import { collection, getDocs, addDoc, doc, deleteDoc } from 'firebase/firestore/lite';
import { db } from "../main";
import router from '../router/index'


export default {
  name: 'Home',
  components: {
    Navbar
  },
  data() {
    return {
      despachos: [],
      despacho: {
        cantidad: '',
        producto: '',
        nombre: '',
        destino: '',
        giro: '',
        comtrib: '',
        transporte: '',
        dia: ''
      }
    }
  },

  methods:{
  // GET / OBTENER / Consulta instantánea 
    async obtenerDatos () { 
      const querySnapshot = await getDocs(collection(db, "despachos"));
        querySnapshot.forEach((doc) => {
        let despacho = doc.data()
        despacho.id = doc.id
        this.despachos.push(despacho)
        console.log(despacho)
      });
    },

    async agregarDato(){
      const docRef = await addDoc(collection(db, "despachos"), {
        cantidad: this.despacho.cantidad,
        producto: this.despacho.producto,
        nombre: this.despacho.nombre,
        destino: this.despacho.destino,
        giro: this.despacho.giro,
        comtrib: this.despacho.comtrib,
        transporte: this.despacho.transporte,
        dia: this.despacho.dia
      })
        .then(() => {
          console.log("Documento añadido");
        })
        .catch(function(error) {
          console.error("Error al añadir el documento: ", error);
        });

        router.go('/')
    },

    // DELETE / ELIMINAR / BORRAR
        async eliminarDato (id){
          await deleteDoc(doc(db, "despachos", id ));

          router.go('/')
        },        



  },
    mounted() {
      this.obtenerDatos();
    },
}
</script>


<style scoped>

.table {
  color: white;
}

#sdelete {
    cursor: pointer;
}

.titulo {
    text-align: center;
    margin-bottom: 20px;
}

.avatar {
    height: 180px;
    width: 301px;
    border-radius: 10px;
}  

</style>