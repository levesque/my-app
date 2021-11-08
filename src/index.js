import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


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

ReactDOM.render(
    <FilterableProductTable rawData={RAWDATA} />,
    document.getElementById('root')
);
