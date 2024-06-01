import gato_fondo_naranja  from "../img/gato_fondo_naranja.svg"
import  logo_clinica from "../img/logo_clinica.svg"
import  {Link} from 'react-router-dom'


export const FormularioUsuarios = () => {
  return (
    <>
 {<img src={gato_fondo_naranja} alt="logo"/> }
 {<img src={logo_clinica} alt="logo" /> }
       

        <div>
          <h1 className="text-blue-400 font-black text-6xl">
            Regalanos Tus Datos Personales 
             </h1>
             <div className='mt-20 md:mt:5 shandow-lg px-5 py-10 rounded-xl bg-white'>

              </div>
              <form >
                <div>
                  <label 
                        className="uppercase text-gray-600 block text-xl font-bold"
                  >
                    
                    Nombres
                  </label>
                  <input  
                       type="text"
                      placeholder="nombres del responsable"
                      className="border w-full p-3 mt-3 bg-gray-200 rounded-xl"
                     
                      />
                       </div>
                        <label 
                         className="uppercase text-gray-600 block text-xl font-bold"

                        >
                          APELLIDOS
                        </label>
                        <input 
                            type="text" 
                            placeholder="apellidos del responsable"
                            className="border w-full p-3 mt-3 bg-gray-200 rounded-xl"
                       />
                       <div>
                      </div>
                      <label
                         className="uppercase text-gray-600 block text-xl font-bold"

                      >
                           CEDULA
                      </label>
                      <input 
                          type="text"
                          placeholder= "ingresa documento"
                          className="border w-full p-3 mt-3 bg-gray-200 rounded-xl"

                          />
                          <div>
                          </div>
                          <label 
                                className="uppercase text-gray-600 block text-xl font-bold"

                          >
                             EMAIL
                          </label>
                          <input 
                             type="text" 
                             placeholder= "ingresa tu email"
                             className="border w-full p-3 mt-3 bg-gray-200 rounded-xl"

                             />
                             <div>
                             </div>
                              
                             <label
                               className="uppercase text-gray-600 block text-xl font-bold"
                              >
                               TELEFONO
                             </label>
                             <input 
                                 type="text"
                                 placeholder= "ingresa tu telefono"
                                 className="border w-full p-3 mt-3 bg-gray-200 rounded-xl"
                                 />
                                 
                                 <div>
                                </div>
                                <label
                                className="uppercase text-gray-600 block text-xl font-bold"
                                     >
                                     DIRECCION
                                </label>
                                  <input 
                                       type="text" 
                                       placeholder= "ingresa tu direccion"
                                       className="border w-full p-3 mt-3 bg-gray-200 rounded-xl"
                                       />
                                  <div>
                                  </div>
                                   <input 
                                      type="submit"
                                      value="SIGUIENTE"
                                      className="bg-blue-400 w-full py-3 px-10 rounded-xl text-black upperca
                                          -bold mt-5 hover:cursor-pointer hover:bg-blue-600 md :w-auto" 
                                          />
              
                                   
                                
                                
                                
                                     
                                    
        </form>
                             
               
              
        </div>

    </>
  );
}
export  default FormularioUsuarios  ;
