import React from 'react';
import './ShoppingPage.css';
import {Row, Col, Button, List, Card} from 'antd';
import { connect } from 'react-redux';
import ShoppingCart from './ShoppingCart';
import UserService from '../services/UserService';
import {addToCart, removeFromCart} from '../redux/cartActions';
import {FieldTimeOutlined, EuroOutlined} from '@ant-design/icons';
import LoadingSpinner from './LoadingSpinner';


const { Meta } = Card;
const mapStateToProps = state => ({
    shop: state.currentShop.data,
    cart: state.cart
})

const mapDispatchToProps = (dispatch) => ({
    addToCart: (product, qty) => {dispatch(addToCart(product, qty))},
    deleteCartItem: (product) => {dispatch(removeFromCart(product))}
});

class ShoppingPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showItems: false,
            selectedItems:[],
            estimatedTime: 20,
        };

        this.showItemList = this.showItemList.bind(this);
        this.hideItemList = this.hideItemList.bind(this);
        this.checkoutHandler = this.checkoutHandler.bind(this);
    }

    checkoutHandler() {
        let isLoggedIn = UserService.isAuthenticated();
        if(!isLoggedIn){
            this.props.history.push('/login');
        }else{
            this.props.history.push('/checkout');
        }
    }

    showItemList(category){
        this.setState({
            selectedItems: this.props.shop.products.filter(item => item.category == category),
            showItems: true
        })
    }

    hideItemList(){
        this.setState({
            showItems: false
        })
    }

    render(){
        const categories = () => (
            <Row className="categories">
                {this.props.shop==null?
                <LoadingSpinner/>
                :
                [... new Set(this.props.shop.products.map(item => item.category))].map(category=>
                <Col key={category}  span={8}>
                    <div className="woodenBox" onClick={()=>this.showItemList(category)}>
                        <img alt={category} src={`./images/categories/${category}.svg`}/>
                    </div>
                </Col>
                )
            }
            <div className={this.state.showItems?'blurCover':'hidden'}/>
            </Row>
        )

        const shopDetail = () => {
            if(this.props.shop==null){
                return(<p>Loading</p>);
            } else {
                return(<div>
                    <div className='shopHead' width='100%'>
                    <img className='shopIcon' alt="logo" src={this.props.shop.icon}/>
                    <h4 className='shopAddress'>{this.props.shop.address.street} {this.props.shop.houseNr}</h4>
                    </div>
                    <div/>
                    <h3 className='title'><FieldTimeOutlined /> Estimated Delivery Time </h3>
                    <h4 className='content'>{this.state.estimatedTime} Minutes</h4>
                    <h3 className='title'><EuroOutlined /> Minimum Order Price</h3>
                    <h4 className='content'>{this.props.shop.minimumPrice} €</h4>
                    </div>);
            }
        }

        const floatingItemList = () => (
            <div className={this.state.showItems?'floatingContainer':'hidden'}>
                <Button type="primary" onClick={this.hideItemList}>back</Button>
                {this.props.shop==null?
                <div>Loading</div>
                :
                <List
                locale={{ emptyText: (<span>
                    Loading
                    <Button>do something</Button>
                    </span>)}}
                bordered = {false}
                dataSource = {this.state.selectedItems}
                renderItem={(item) => (
                    <Card className="cart-card">
                        <Row gutter={{xs: 8, sm: 16}}>
                            <Col span={6}>
                                <img width="100%" alt={item.image} src={item.image}/>
                            </Col>
                            <Col span={18}>
                            <Meta
                                title={item.name}
                                description={"Price " + item.price + "€" + '/' + item.unitType}
                            />
                            <Button type="primary" onClick={()=>this.props.addToCart(item, 1)}>Add to Cart</Button>
                            </Col>
                        </Row>
                    </Card>)}/>}
            </div>
        )

        const canProceed = this.props.shop != null && this.props.cart.price>=this.props.shop.minimumPrice;

        return (
            <div>     
                
                <Row>
                    <Col span={4} className="side-bar">
                        {shopDetail()}
                    </Col> 
                    <Col span={16}>
                        
                        {categories()}
                    
                        
                    </Col>
                    <Col span={4} className="side-bar">
                        <ShoppingCart/>
                        {console.log(canProceed)}
                        <Button type="primary" shape='rounded' className='checoutButton' disabled={!canProceed} onClick={this.checkoutHandler}>
                            Proceed to Checkout
                        </Button>
                    </Col>
                    {floatingItemList()}
                </Row>                      
            </div>

        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingPage);