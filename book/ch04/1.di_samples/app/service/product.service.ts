// 상품정보 클래스 & 외부에서 사용하도록 export
export class Product {
    constructor(public id : number,
                public title : string,
                public price : number,
                public description : string ) {

    }
}

export class ProductService {
    getProduct() : Product {
        // 코드를 간단히 하기 위해 하드코딩된 값 반환
        // => 실제는 서버에서 데이터를 가져오는 로직
        return new Product(0, "iPhone8", 849.99, "The latest iPhone, 5.8-inch screen");
    }
}