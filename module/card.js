class CardCompnent {
    constructor(contentObj) {
        this.contentObj = contentObj;
        
    }
    html() {
        return  `<div class="card mb-2 pl-2 shadow">                                    
        ${this.contentDiv}
        </div>`
    }
}
class PropertyCard extends CardCompnent {
    
    constructor(contentObj) {
        super(contentObj);        
        this.prepareContent(contentObj);
        this.contentDiv = `<div class="card-body text-left">${this.content}</div>`;                    
    }
    prepareContent(contentObj) {
        let {"address":adr} = contentObj; 
        this.content = adr ; 
        

    }

}
export {PropertyCard,CardCompnent} ; 
