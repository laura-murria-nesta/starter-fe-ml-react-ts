export function Report(props: any) {

    const { 
      result,
    } = props;

    return (
    <div>
        Results were: 
        <br/>
        {JSON.stringify(result)}
    </div>
    );

}