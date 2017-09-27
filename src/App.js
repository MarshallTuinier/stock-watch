import React, { Component } from 'react';
import Background from './Components/Background';
import { withScreenSize } from '@vx/responsive';
import styled from 'styled-components';
import Chart from './Components/Chart';
import Dropdown from './Components/Dropdown';
import formatPrice from './Utils/formatPrice';
import { fetchStockData } from './Utils/api';
import { numberMapper } from './Utils/numberMapper';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      dropdownOpen: false,
      stockSymbol: 'AAPL',
      activeItem: 'last 30 days',
      input: '',
      error: false
    };
  }

  handleDropdown = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  handleSelect = value => {
    this.setState({
      activeItem: value
    });
    this.handleDropdown();
  };

  handleChange = event => {
    this.setState({
      input: event.target.value
    });
  };

  handleSearch = event => {
    event.preventDefault();
    this.setState({
      data: {},
      error: false
    });
    fetchStockData(this.state.input)
      .then(json => {
        if (json['Error Message']) {
          this.setState({
            error: true
          });
        } else {
          this.setState({
            data: json,
            stockSymbol: this.state.input,
            input: ''
          });
        }
      })
      .catch(error => {
        console.log(`Sorry, there was an error: ${error}`);
        this.setState({
          error: true
        });
      });
  };

  //Grab our data from the coindesk api
  componentDidMount() {
    fetchStockData(this.state.stockSymbol)
      .then(json => {
        this.setState({
          data: json
        });
      })
      .catch(error => {
        console.log(`Sorry, there was an error: ${error}`);
        this.setState({
          error: true
        });
      });
  }

  render() {
    const { screenWidth, screenHeight } = this.props;
    const { data } = this.state;

    //If there is an error, we want to conditionally render an error component, and have the user be able to try to send another Stock
    if (this.state.error)
      return (
        <div className={this.props.className}>
          <Center>
            <h1>Stock Watch</h1>
            <h3>Sorry, an error has occured. Please try again.</h3>
            <form>
              <Input type="text" onChange={this.handleChange} />
              <Button onClick={this.handleSearch}>Search</Button>{' '}
            </form>
          </Center>
          <Background width={screenWidth} height={screenHeight} />
        </div>
      );

    //Conditional Rendering to ensure the data is loaded when trying to render
    //TODO Bring in nice neat loading component
    if (!data['Time Series (Daily)'])
      return (
        <div className={this.props.className}>
          <Center>
            <h1>Stock Watch</h1>
            <h1>Loading...</h1>
          </Center>
          <Background width={screenWidth} height={screenHeight} />
        </div>
      );

    //Format our data to the desired shape
    const allPrices = Object.keys(data['Time Series (Daily)'])
      .map(d => {
        return {
          date: d,
          price: data['Time Series (Daily)'][d]['4. close']
        };
      })
      //We need to reverse the data to get it in chornological order
      .reverse();

    //Get the determined number of days based on the selected filter
    const days = numberMapper(this.state.activeItem);
    const makePrices = (allPrices, days) => {
      if (days > allPrices.length) {
        return allPrices;
      }
      return allPrices.slice(allPrices.length - days - 1, allPrices.length + 1);
    };

    const prices = makePrices(allPrices, days);

    //Most current price is grabbed from the last element in our dataset
    const currentPrice = prices[prices.length - 1].price;
    const firstPrice = prices[0].price;
    const diffPrice = currentPrice - firstPrice;
    const hasIncreased = diffPrice > 0;

    return (
      <div className={this.props.className}>
        <Background width={screenWidth} height={screenHeight} />
        <Center>
          <h1>Stock Watch</h1>
          <h3>Enter a stock symbol below to track its changes</h3>
          <form>
            <Input type="text" onChange={this.handleChange} />
            <Button onClick={this.handleSearch}>Search</Button>{' '}
          </form>
          <ChartContainer>
            <TitleBar>
              <Title>
                <div>{this.state.stockSymbol.toUpperCase()} Price</div>
                <Dropdown
                  handleDropdown={this.handleDropdown}
                  handleSelect={this.handleSelect}
                  dropdownOpen={this.state.dropdownOpen}
                  activeItem={this.state.activeItem}
                />
              </Title>
              <Prices>
                <div>{formatPrice(currentPrice)}</div>
                <div className={hasIncreased ? 'increased' : 'decreased'}>
                  <small>
                    {hasIncreased ? '+' : ''}
                    {formatPrice(diffPrice)}
                  </small>
                </div>
              </Prices>
            </TitleBar>
            <Chart data={prices} />
          </ChartContainer>
          <Disclaimer>{data.disclaimer}</Disclaimer>
        </Center>
      </div>
    );
  }
}

//------------Styles-------------

const StyledApp = styled(App)`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  flex: 1;
`;

const Center = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  flex: 1;
  font-family: arial;
  flex-direction: column;
  h1,
  h3 {
    color: #27273f;
  }
`;

const ChartContainer = styled.div`
  width: 600px;
  height: 400px;
  background-color: #27273f;
  border-radius: 8px;
  color: white;
  padding-bottom: 50px;
`;

const Disclaimer = styled.p`
  color: white;
  opacity: 0.4;
  font-size: 11px;
`;

const Title = styled.div`margin-top: -20px;`;

const TitleBar = styled.div`
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Prices = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  .increased {
    color: #00f1a1;
  }
  .decreased {
    color: red;
  }
`;

const Input = styled.input`
  margin-bottom: 20px;
  outline: none;
  background: transparent;
  border: 1px solid #27273f;
  color: #27273f;
`;

const Button = styled.button`
  margin: 0 auto;
  margin-bottom: 20px;
  width: 130px;
  height: 30px;
  background-color: #6086d6;
  border: none;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  color: white;
  &:active {
    transform: translateY(2px);
  }
  &:hover {
    cursor: pointer;
  }
`;

//----------------------End Styles--------------------
export default withScreenSize(StyledApp);
