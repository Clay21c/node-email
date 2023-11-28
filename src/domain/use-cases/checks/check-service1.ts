type CheckServiceOprion = {
    ejecutar( url: string ): Promise<boolean>
}
type SuccessCallback = () => void;
type ErrorCallback = ( error: string ) => void;

export class CheckService implements CheckServiceOprion {
    constructor(
    private readonly sucess: SuccessCallback,
    private readonly error: ErrorCallback

    ) {}
    public  async ejecutar( url: string): Promise<boolean> {
        
        try{
            const req = await fetch( url )
            if ( !req.ok){
                throw new Error(`Request failed with status ${url}`)
            }

            this.sucess();
            return true
        } catch ( error ){
            this.error(`${error}`)
            return false
        }
    }
}