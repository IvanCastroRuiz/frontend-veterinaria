import perro_gato from "../img/perro_gato.svg"
import logo_clinica from "../img/logo_clinica.svg"


export const Mascota = () => {



  return (
    <>
      {<img src={perro_gato} alt="logo" />}
      {<img src={logo_clinica} alt="logo" />}


      <div>
        <h1 className="text-blue-400 font-black text-6xl">
          Regalanos los Datos De Tu Peludo
        </h1>
        <div className='mt-20 md:mt:5 shandow-lg px-5 py-10 rounded-xl bg-white'>

        </div>
        <form >
          <div>
          </div>
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            NOMBRE
          </label>
          <input
            type="text"
            placeholder="nombre del peludo"
            className="border w-full p-3 mt-3 bg-gray-200 rounded-xl"
          />
          <div>
          </div>
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            RAZA
          </label>
          <input
            type="text"
            placeholder="nombre del peludo"
            className="border w-full p-3 mt-3 bg-gray-200 rounded-xl"
          />
          <div>
          </div>
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            EDAD
          </label>
          <input
            type="text"
            placeholder="edad del peludo"
            className="border w-full p-3 mt-3 bg-gray-200 rounded-xl"
          />
          <div>
          </div>
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            COLOR
          </label>
          <input
            type="text"
            placeholder="color del peludo"
            className="border w-full p-3 mt-3 bg-gray-200 rounded-xl"
          />

          <div>
          </div>
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            ESPECIE
          </label>
          <input
            type="text"
            placeholder="especie del peludo"
            className="border w-full p-3 mt-3 bg-gray-200 rounded-xl"
          />
          <div>

          </div>
          <input
            type="submit"
            value="GUARDAR"
            className="bg-blue-400 w-full py-3 px-10 rounded-xl text-black upperca
                                font-bold mt-5 hover:cursor-pointer 
                                hover:-blue-600 md:w-auto"

          />




        </form>
      </div>
    </>
  )
}
export default Mascota; 