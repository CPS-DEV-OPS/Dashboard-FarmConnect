import TemplatePointers from "./components/TemplatePointers"



function LandingIntro(){

    return(
        <div className="hero min-h-full rounded-l-xl bg-base-200">
            <div className="hero-content py-12">
              <div className="max-w-md">

              {/* <h1 className='text-3xl text-center font-bold '><img src="/logo192.png" className="w-12 inline-block mr-2 mask mask-circle" alt="dashwind-logo" />Farmconnect</h1> */}

                <div className="text-center mt-12"><a href="http://farmconncttestt.azurewebsites.net/"><img src="/logo192.png" alt="Farmer Dashboard" className="w-48 inline-block"></img></a></div>
              
              {/* Importing pointers component */}
              <TemplatePointers />
              
              </div>

            </div>
          </div>
    )
      
  }
  
  export default LandingIntro