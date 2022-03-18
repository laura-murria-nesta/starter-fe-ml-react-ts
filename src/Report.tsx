// Once the advice code has been calculated, 
// this component displays the right advice for that advice code
// 0 is where we specifically said we can't advise you at this time
// default should only occur where there was an input problem or system error

export function Report(props: any) {

    const { 
      result,
    } = props;

    return (
    <div>
        Advice is: 
        <br/>
        {renderAdvice(result)}
    </div>
    );

}

function renderAdvice(adviceCode: number) {
	switch (adviceCode) {
			case 0:
        return (  
          <div>
            Unfortunately we're unable to offer you specific advice on optimising your boiler settings at present
          </div>
          );
			case 1:
        return (  
          <div>
            Do this thing please
          </div>
          );
			case 2:
        return (  
          <div>
            Do this other thing please
          </div>
          );
			default:
        return (  
          <div>
            Not found. Unfortunately we're unable to offer you specific advice on optimising your boiler settings at present
          </div>
          );
	}
}