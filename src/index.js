import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';


class FilterableProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rawData: this.props.rawData,
            filterText: "",
            inStockOnly: false,
        };
        this.handleOnFilterChange = this.handleOnFilterChange.bind(this);
        this.handleCheckChanged = this.handleCheckChanged.bind(this);
    }

    handleOnFilterChange(filterText) {
        this.setState({ filterText: filterText });
    }

    handleCheckChanged(checked){
        this.setState({inStockOnly: checked});
    }

    render() {
        return (
            <div>
                <SearchBar filterText={this.state.filterText} onFilterChange={this.handleOnFilterChange} inStockOnly={this.state.inStockOnly} onCheckChange={this.handleCheckChanged}/>
                <ProductTable rawData={this.state.rawData} filterText={this.state.filterText} inStockOnly={this.state.inStockOnly} />
            </div>
        );
    }
}

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleCheckChange = this.handleCheckChange.bind(this);
    }

    handleFilterChange(e) {
        this.props.onFilterChange(e.target.value);
    }

    handleCheckChange(e) {
        this.props.onCheckChange(e.target.checked);
    }

    render(props) {
        return (
            <div>
                <input
                    type="text"
                    value={this.props.filterText}
                    placeholder="Search..."
                    onChange={this.handleFilterChange}
                />
                <br />
                <input type="checkbox" checked={this.props.inStockOnly} onChange={this.handleCheckChange}/> Only show products in stock
            </div>
        );
    }
}

class ProductTable extends React.Component {
    render(props) {
        const rows = [];
        let previousCategory;

        this.props.rawData.forEach(product => {
            if (product.name.includes(this.props.filterText) && (this.props.inStockOnly ? product.stocked : true)) {
                if (product.category !== previousCategory) {
                    rows.push(
                        <ProductCategoryRow category={product.category} key={product.category} />
                    );
                    previousCategory = product.category;
                }
                rows.push(
                    <ProductRow product={product} key={product.name} />
                );
            }
        }
        );

        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        );
    }
}

class ProductCategoryRow extends React.Component {
    render(props) {
        return (
            <tr className="ProductCategoryRow">
                <td colSpan="2">{this.props.category}</td>
            </tr>
        );
    }
}

class ProductRow extends React.Component {
    render(props) {
        return (
            <tr>
                <td className={(this.props.product.stocked ? "" : "OutOfStock")}>{this.props.product.name}</td>
                <td>{this.props.product.price}</td>
            </tr>
        );
    }
}

const RAWDATA = [
    { category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football" },
    { category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball" },
    { category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball" },
    { category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch" },
    { category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5" },
    { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" }
];

const GOLFDATA = {"scores":[{"date":"2020-06-02","course":"Gleneagles","tee":"blue","rating":"70.2","slope":"123","score":"92","differential":20,"scoreNumber":0,"status":"low","allTimeRank":37,"currentRank":8},{"date":"2020-05-28","course":"Delacour","tee":"Blue/White","rating":"71","slope":"134","score":"96","differential":21.1,"scoreNumber":1,"status":"low","allTimeRank":40,"currentRank":10},{"date":"2020-05-17","course":"Serenity","tee":"Blue","rating":"71.1","slope":"137","score":"91","differential":16.4,"scoreNumber":2,"status":"low","allTimeRank":15,"currentRank":3},{"date":"2020-05-15","course":"Delacour","tee":"Blue/White","rating":"71","slope":"134","score":"101","differential":25.3,"scoreNumber":3,"status":"high","allTimeRank":62,"currentRank":"&nbsp"},{"date":"2020-05-05","course":"Blue Devil","tee":"blue","rating":"70.6","slope":"126","score":"95","differential":21.9,"scoreNumber":4,"status":"high","allTimeRank":45,"currentRank":"&nbsp"},{"date":"2019-10-17","course":"Delacour","tee":"Blue/White","rating":"71","slope":"134","score":"86","differential":12.6,"scoreNumber":5,"status":"low","allTimeRank":2,"currentRank":1},{"date":"2019-10-07","course":"Serenity","tee":"Blue","rating":"71.1","slope":"137","score":"93","differential":18.1,"scoreNumber":6,"status":"low","allTimeRank":27,"currentRank":5},{"date":"2019-09-08","course":"Dunes","tee":"White","rating":"69.6","slope":"114","score":"93","differential":23.2,"scoreNumber":7,"status":"high","allTimeRank":52,"currentRank":"&nbsp"},{"date":"2019-09-07","course":"Tobiano","tee":"Spur","rating":"71.9","slope":"127","score":"96","differential":21.4,"scoreNumber":8,"status":"high","allTimeRank":42,"currentRank":"&nbsp"},{"date":"2019-09-06","course":"Eaglepoint","tee":"Gold","rating":"70.2","slope":"123","score":"87","differential":15.4,"scoreNumber":9,"status":"low","allTimeRank":9,"currentRank":2},{"date":"2019-09-05","course":"Kamloops G&CC","tee":"gold","rating":"70.2","slope":"122","score":"94","differential":22,"scoreNumber":10,"status":"high","allTimeRank":48,"currentRank":"&nbsp"},{"date":"2019-08-24","course":"Copper Point","tee":"green","rating":"68.9","slope":"119","score":"98","differential":27.6,"scoreNumber":11,"status":"high","allTimeRank":69,"currentRank":"&nbsp"},{"date":"2019-08-23","course":"Riverside Fairmont","tee":"Blue","rating":"68.5","slope":"130","score":"95","differential":23,"scoreNumber":12,"status":"high","allTimeRank":51,"currentRank":"&nbsp"},{"date":"2019-08-22","course":"Radium Springs","tee":"Blue","rating":"69.7","slope":"120","score":"95","differential":23.8,"scoreNumber":13,"status":"high","allTimeRank":56,"currentRank":"&nbsp"},{"date":"2019-08-14","course":"Delacour","tee":"Blue/White","rating":"71","slope":"134","score":"93","differential":18.6,"scoreNumber":14,"status":"low","allTimeRank":31,"currentRank":6},{"date":"2019-07-29","course":"Delacour","tee":"Blue/White","rating":"71","slope":"134","score":"91","differential":16.9,"scoreNumber":15,"status":"low","allTimeRank":19,"currentRank":4},{"date":"2019-07-17","course":"Shagannapi","tee":"blue","rating":"62.9","slope":"110","score":"82","differential":19.6,"scoreNumber":16,"status":"low","allTimeRank":34,"currentRank":7},{"date":"2019-07-15","course":"Serenity","tee":"Blue","rating":"71.1","slope":"137","score":"96","differential":20.5,"scoreNumber":17,"status":"low","allTimeRank":38,"currentRank":9},{"date":"2019-07-10","course":"Redwood Meadows","tee":"Blue/White","rating":"70.3","slope":"123","score":"96","differential":23.6,"scoreNumber":18,"status":"high","allTimeRank":53,"currentRank":"&nbsp"},{"date":"2019-06-24","course":"Maple Ridge","tee":"blue","rating":"68.8","slope":"115","score":"93","differential":23.8,"scoreNumber":19,"status":"high","allTimeRank":57,"currentRank":"&nbsp"},{"date":"2019-06-15","course":"Eagle Ranch","tee":"blue","rating":"69.6","slope":"133","score":"100","differential":25.8,"scoreNumber":20,"status":"old","allTimeRank":64,"currentRank":"&nbsp"},{"date":"2019-06-14","course":"Radium Springs","tee":"Blue","rating":"69.7","slope":"120","score":"87","differential":16.3,"scoreNumber":21,"status":"old","allTimeRank":14,"currentRank":"&nbsp"},{"date":"2019-06-13","course":"River Spirit","tee":"Blue/White","rating":"70.7","slope":"126","score":"86","differential":13.7,"scoreNumber":22,"status":"old","allTimeRank":5,"currentRank":"&nbsp"},{"date":"2019-06-12","course":"Shagannapi","tee":"blue","rating":"62.9","slope":"110","score":"84","differential":21.7,"scoreNumber":23,"status":"old","allTimeRank":43,"currentRank":"&nbsp"},{"date":"2019-06-06","course":"Shagannapi","tee":"blue","rating":"62.9","slope":"110","score":"87","differential":24.8,"scoreNumber":24,"status":"old","allTimeRank":59,"currentRank":"&nbsp"},{"date":"2019-06-03","course":"Delacour","tee":"blue","rating":"72.3","slope":"135","score":"92","differential":16.5,"scoreNumber":25,"status":"old","allTimeRank":18,"currentRank":"&nbsp"},{"date":"2019-06-01","course":"Glencoe - Forest","tee":"White","rating":"70.4","slope":"133","score":"105","differential":29.4,"scoreNumber":26,"status":"old","allTimeRank":72,"currentRank":"&nbsp"},{"date":"2019-05-29","course":"Shagannapi","tee":"blue","rating":"62.9","slope":"110","score":"84","differential":21.7,"scoreNumber":27,"status":"old","allTimeRank":44,"currentRank":"&nbsp"},{"date":"2019-04-18","course":"Delacour","tee":"blue","rating":"72.3","slope":"135","score":"91","differential":15.7,"scoreNumber":28,"status":"old","allTimeRank":11,"currentRank":"&nbsp"},{"date":"2019-04-13","course":"Shaftesbury","tee":"Gold","rating":"69.5","slope":"128","score":"91","differential":19,"scoreNumber":29,"status":"old","allTimeRank":33,"currentRank":"&nbsp"},{"date":"2019-04-12","course":"Glen Dornoch","tee":"White","rating":"70.2","slope":"127","score":"99","differential":25.6,"scoreNumber":30,"status":"old","allTimeRank":63,"currentRank":"&nbsp"},{"date":"2019-04-11","course":"Glen Dornoch","tee":"White","rating":"70.2","slope":"127","score":"91","differential":18.5,"scoreNumber":31,"status":"old","allTimeRank":30,"currentRank":"&nbsp"},{"date":"2019-04-10","course":"The Pearl","tee":"White","rating":"69.7","slope":"126","score":"96","differential":23.6,"scoreNumber":32,"status":"old","allTimeRank":54,"currentRank":"&nbsp"},{"date":"2019-04-07","course":"Possum Trot","tee":"White","rating":"70.4","slope":"118","score":"89","differential":17.8,"scoreNumber":33,"status":"old","allTimeRank":25,"currentRank":"&nbsp"},{"date":"2019-04-06","course":"Shaftesbury","tee":"Gold","rating":"69.5","slope":"128","score":"101","differential":27.8,"scoreNumber":34,"status":"old","allTimeRank":70,"currentRank":"&nbsp"},{"date":"2018-10-18","course":"Delacour","tee":"blue","rating":"72.3","slope":"135","score":"97","differential":20.7,"scoreNumber":35,"status":"old","allTimeRank":39,"currentRank":"&nbsp"},{"date":"2018-10-15","course":"Blue Devil","tee":"blue","rating":"70.6","slope":"126","score":"91","differential":18.3,"scoreNumber":36,"status":"old","allTimeRank":29,"currentRank":"&nbsp"},{"date":"2018-09-24","course":"Delacour","tee":"blue","rating":"72.3","slope":"135","score":"93","differential":17.3,"scoreNumber":37,"status":"old","allTimeRank":21,"currentRank":"&nbsp"},{"date":"2018-09-19","course":"Blue Devil","tee":"blue","rating":"70.6","slope":"126","score":"88","differential":15.6,"scoreNumber":38,"status":"old","allTimeRank":10,"currentRank":"&nbsp"},{"date":"2018-09-17","course":"Blue Devil","tee":"blue","rating":"70.6","slope":"126","score":"96","differential":22.8,"scoreNumber":39,"status":"old","allTimeRank":50,"currentRank":"&nbsp"},{"date":"2018-09-09","course":"Dakota Dunes","tee":"blue","rating":"70.5","slope":"123","score":"102","differential":28.9,"scoreNumber":40,"status":"old","allTimeRank":71,"currentRank":"&nbsp"},{"date":"2018-09-08","course":"Jackfish Lodge","tee":"blue","rating":"70.6","slope":"121","score":"86","differential":14.4,"scoreNumber":41,"status":"old","allTimeRank":7,"currentRank":"&nbsp"},{"date":"2018-09-07","course":"North Battleford G&CC","tee":"blue","rating":"69.3","slope":"118","score":"97","differential":26.5,"scoreNumber":42,"status":"old","allTimeRank":66,"currentRank":"&nbsp"},{"date":"2018-09-06","course":"Dakota Dunes","tee":"blue","rating":"70.5","slope":"123","score":"89","differential":17,"scoreNumber":43,"status":"old","allTimeRank":20,"currentRank":"&nbsp"},{"date":"2018-08-30","course":"MuirfieldLakes","tee":"black","rating":"69.4","slope":"123","score":"90","differential":18.9,"scoreNumber":44,"status":"old","allTimeRank":32,"currentRank":"&nbsp"},{"date":"2018-08-25","course":"Copper Point","tee":"green","rating":"68.9","slope":"119","score":"83","differential":13.4,"scoreNumber":45,"status":"old","allTimeRank":3,"currentRank":"&nbsp"},{"date":"2018-08-22","course":"River Spirit","tee":"blue","rating":"71.8","slope":"130","score":"97","differential":21.9,"scoreNumber":46,"status":"old","allTimeRank":46,"currentRank":"&nbsp"},{"date":"2018-08-16","course":"Delacour","tee":"blue","rating":"72.3","slope":"135","score":"96","differential":19.8,"scoreNumber":47,"status":"old","allTimeRank":35,"currentRank":"&nbsp"},{"date":"2018-08-08","course":"Heritage Pointe/Heritage","tee":"black","rating":"71.3","slope":"129","score":"101","differential":26,"scoreNumber":48,"status":"old","allTimeRank":65,"currentRank":"&nbsp"},{"date":"2018-07-23","course":"Blue Devil","tee":"blue","rating":"70.6","slope":"126","score":"97","differential":23.7,"scoreNumber":49,"status":"old","allTimeRank":55,"currentRank":"&nbsp"},{"date":"2018-07-15","course":"Sirocco","tee":"white","rating":"69.7","slope":"131","score":"96","differential":22.7,"scoreNumber":50,"status":"old","allTimeRank":49,"currentRank":"&nbsp"},{"date":"2018-07-11","course":"Gleneagles","tee":"blue","rating":"70.2","slope":"123","score":"88","differential":16.4,"scoreNumber":51,"status":"old",
"allTimeRank":16,"currentRank":"&nbsp"},{"date":"2018-06-25","course":"Stewart Creek","tee":"blue","rating":"71.6","slope":"127","score":"91","differential":17.3,"scoreNumber":52,"status":"old","allTimeRank":22,"currentRank":"&nbsp"},{"date":"2018-06-18","course":"Delacour","tee":"blue","rating":"72.3","slope":"135","score":"91","differential":15.7,"scoreNumber":53,"status":"old","allTimeRank":12,"currentRank":"&nbsp"},{"date":"2018-06-16","course":"Wolf Creek","tee":"blue","rating":"67","slope":"124","score":"97","differential":27.3,"scoreNumber":54,"status":"old","allTimeRank":68,"currentRank":"&nbsp"},{"date":"2018-06-15","course":"Red Deer GCC","tee":"white","rating":"74.9","slope":"135","score":"91","differential":13.5,"scoreNumber":55,"status":"old","allTimeRank":4,"currentRank":"&nbsp"},{"date":"2018-06-12","course":"Sirocco","tee":"blue","rating":"72.4","slope":"138","score":"105","differential":26.7,"scoreNumber":56,"status":"old","allTimeRank":67,"currentRank":"&nbsp"},{"date":"2018-06-07","course":"Delacour","tee":"blue","rating":"72.3","slope":"135","score":"93","differential":17.3,"scoreNumber":57,"status":"old","allTimeRank":23,"currentRank":"&nbsp"},{"date":"2018-05-21","course":"Heather Glen C/H","tee":"white","rating":"68.2","slope":"119","score":"84","differential":15,"scoreNumber":58,"status":"old","allTimeRank":8,"currentRank":"&nbsp"},{"date":"2018-05-08","course":"Blue Devil","tee":"blue","rating":"70.6","slope":"126","score":"95","differential":21.9,"scoreNumber":59,"status":"old","allTimeRank":47,"currentRank":"&nbsp"},{"date":"2018-05-02","course":"Elbow Springs M/S","tee":"blue","rating":"69.5","slope":"116","score":"86","differential":16.1,"scoreNumber":60,"status":"old","allTimeRank":13,"currentRank":"&nbsp"},{"date":"2017-10-23","course":"Elbow Springs M/S","tee":"blue","rating":"69.5","slope":"116","score":"94","differential":23.9,"scoreNumber":61,"status":"old","allTimeRank":58,"currentRank":"&nbsp"},{"date":"2017-10-19","course":"Elbow Springs M/S","tee":"blue","rating":"69.5","slope":"116","score":"95","differential":24.8,"scoreNumber":62,"status":"old","allTimeRank":60,"currentRank":"&nbsp"},{"date":"2017-09-25","course":"Stewart Creek","tee":"blue/white","rating":"69.5","slope":"124","score":"97","differential":25.1,"scoreNumber":63,"status":"old","allTimeRank":61,"currentRank":"&nbsp"},{"date":"2017-09-24","course":"Sirocco","tee":"blue","rating":"72.4","slope":"138","score":"94","differential":17.7,"scoreNumber":64,"status":"old","allTimeRank":24,"currentRank":"&nbsp"},{"date":"2017-09-10","course":"Harvest ","tee":"blue","rating":"70.3","slope":"119","score":"89","differential":17.8,"scoreNumber":65,"status":"old","allTimeRank":26,"currentRank":"&nbsp"},{"date":"2017-09-09","course":"Gallaghers","tee":"blue","rating":"70.3","slope":"129","score":"93","differential":19.9,"scoreNumber":66,"status":"old","allTimeRank":36,"currentRank":"&nbsp"},{"date":"2017-08-31","course":"Delacour","tee":"blue","rating":"72.3","slope":"135","score":"94","differential":18.2,"scoreNumber":67,"status":"old","allTimeRank":28,"currentRank":"&nbsp"},{"date":"2017-08-27","course":"St Eugene","tee":"blue","rating":"70.4","slope":"132","score":"95","differential":21.1,"scoreNumber":68,"status":"old","allTimeRank":41,"currentRank":"&nbsp"},{"date":"2017-08-26","course":"Wildstone","tee":"blue","rating":"70.6","slope":"117","score":"85","differential":13.9,"scoreNumber":69,"status":"old","allTimeRank":6,"currentRank":"&nbsp"},{"date":"2017-08-25","course":"Bootleg Gap","tee":"blue","rating":"69.6","slope":"120","score":"87","differential":16.4,"scoreNumber":70,"status":"old","allTimeRank":17,"currentRank":"&nbsp"},{"date":"2017-08-22","course":"Blue Devil","tee":"blue","rating":"70.6","slope":"126","score":"79","differential":7.5,"scoreNumber":71,"status":"old","allTimeRank":1,"currentRank":"&nbsp"}],"tees":[{"course":"Blue Devil","tee":"blue","rating":"70.6","slope":"126"},{"course":"Bootleg Gap","tee":"blue","rating":"69.6","slope":"120"},{"course":"Copper Point","tee":"green","rating":"68.9","slope":"119"},{"course":"Delacour","tee":"Blue/White","rating":"71","slope":"134"},{"course":"Delacour","tee":"blue","rating":"72.3","slope":"135"},{"course":"Dunes","tee":"White","rating":"69.6","slope":"114"},{"course":"Eagle Ranch","tee":"blue","rating":"69.6","slope":"133"},{"course":"Eaglepoint","tee":"Gold","rating":"70.2","slope":"123"},{"course":"Eaglepoint","tee":"white","rating":"68.9","slope":"117"},{"course":"Elbow Springs M/S","tee":"blue","rating":"69.5","slope":"116"},{"course":"Glen Dornoch","tee":"White","rating":"70.2","slope":"127"},{"course":"Glencoe - Forest","tee":"White","rating":"70.4","slope":"133"},{"course":"Gleneagles","tee":"blue","rating":"70.2","slope":"123"},{"course":"HG Creek/Hills","tee":"white","rating":"68.2","slope":"119"},{"course":"Harvest ","tee":"blue","rating":"70.3","slope":"119"},{"course":"Heather Glen Creek/Hills","tee":"white","rating":"68.2","slope":"119"},{"course":"Kamloops G&CC","tee":"gold","rating":"70.2","slope":"122"},{"course":"Maple Ridge","tee":"blue","rating":"68.8","slope":"115"},{"course":"Possum Trot","tee":"White","rating":"70.4","slope":"118"},{"course":"Radium Springs","tee":"Blue","rating":"69.7","slope":"120"},{"course":"Red Deer GCC","tee":"white","rating":"74.9","slope":"135"},{"course":"Redwood Meadows","tee":"Blue/White","rating":"70,3","slope":"123"},{"course":"River Spirit","tee":"Blue/White","rating":"70.7","slope":"126"},{"course":"Riverside Fairmont","tee":"Blue","rating":"68.5","slope":"130"},{"course":"Serenity","tee":"Blue","rating":"71.1","slope":"137"},{"course":"Shaftesbury","tee":"Gold","rating":"69.5","slope":"128"},{"course":"Shagannapi","tee":"blue","rating":"62.9","slope":"110"},{"course":"Sirocco","tee":"blue","rating":"72.4","slope":"138"},{"course":"Sirocco","tee":"white","rating":"69.7","slope":"131"},{"course":"St Eugene","tee":"blue","rating":"70.4","slope":"132"},{"course":"Stewart Creek","tee":"blue","rating":"71.6","slope":"127"},{"course":"Stewart Creek","tee":"blue/white","rating":"69.5","slope":"124"},{"course":"The Pearl","tee":"White","rating":"69.7","slope":"126"},{"course":"Tobiano","tee":"Spur","rating":"71.9","slope":"127"},{"course":"Wildstone","tee":"blue","rating":"70.6","slope":"117"},{"course":"Wolf Creek","tee":"blue","rating":"67","slope":"124"},{"course":"shmoobie","tee":"gree","rating":"123",
"slope":"71.2"}]};

ReactDOM.render(
    <FilterableProductTable rawData={RAWDATA} golfData={GOLFDATA}/>,
    document.getElementById('root')
);

// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();