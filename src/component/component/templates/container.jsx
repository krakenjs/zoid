
export function defaultContainerTemplate({ id, tag, context, CLASS, outlet, jsxDom }) {

    return (
        <div id={ id } class={ `${ CLASS.XCOMPONENT } ${ CLASS.XCOMPONENT }-tag-${ tag } ${ CLASS.XCOMPONENT }-context-${ context }` }>
            <style>
                {`
                    #${ id } {
                        height: 150px;
                        width: 300px;
                    }

                    #${ id } iframe {
                        height: 100%;
                        width: 100%;
                    }
                `}
            </style>

            { outlet }
        </div>
    );
}
