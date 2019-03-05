import React, { Component } from 'react'
import { ScrollView, Text, Button, View } from 'react-native'
import { connect } from 'react-redux';
import { LoginSelectors } from '../Redux/LoginRedux';
import ProdutosActions, { ProdutosSelectors } from '../Redux/ProdutosRedux';
import VendasConsumoActions from '../Redux/VendasConsumoRedux';
import Accordion from 'react-native-collapsible/Accordion'
import BottomNavigation, {
  FullTab
} from 'react-native-material-bottom-navigation'
// Styles

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSections: []
    }
  }

  componentDidMount() {
    this.props.getProdutos(this.props.token);
    console.tron.log(this.props.userId)
  }

  _renderHeader = section => {
    return (
      <View>
        <Text>{section.title}</Text>
      </View>
    );
  };

  _renderSectionTitle = section => {
    return (
      <View>
        <Text>{section.title}</Text>
      </View>
    );
  };

  tabs = [
    {
      key: 'games',
      icon: 'gamepad-variant',
      label: 'Games',
      barColor: '#388E3C',
      pressColor: 'rgba(255, 255, 255, 0.16)'
    },
    {
      key: 'movies-tv',
      icon: 'movie',
      label: 'Movies & TV',
      barColor: '#B71C1C',
      pressColor: 'rgba(255, 255, 255, 0.16)'
    },
    {
      key: 'music',
      icon: 'music-note',
      label: 'Music',
      barColor: '#E64A19',
      pressColor: 'rgba(255, 255, 255, 0.16)'
    }
  ]

  _renderContent = section => {
    const { userId, token, createVenda } = this.props;
    return (
      <View>
        <Text>
          {section.content}
        </Text>
        <Button 
          title='Comprar!'
          onPress={() => createVenda(token, {
            peso: 15, 
            metodo: section.title.toLowerCase(),
            filtros: 1,
            user_id: userId
          })}
        />
      </View>
    );
  }

  _updateSections = activeSections => {
    this.setState({ activeSections });
  };

  renderContent = () => {
    return [
      {
        title: 'Aeropress',
        content: `Aeropress é um método de extração criado em 2005 por Alan Adler. Esse método utiliza um embolo 
        similar a uma seringa, força a água a passar por um filtro de papel (ou malha de metal) e resulta em um café suave,
        similar a um café coado.`
      },
      {
        title: 'Hario V60',
        content: `O método de extração mais comum no Brasil, o famoso "café coado", leva
        o nome de Hario V60 devido à marca japonesa Hario que criou o porta filtro em formato cônico,
        com 60° de inclinação. Esse método resulta em um café suave`
      }
    ]
  }

  render () {
    return (
        <ScrollView>
          <Accordion
            sections={this.renderContent()}
            activeSections={this.state.activeSections}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
            onChange={this._updateSections}
          />
        
        </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  return {
    produtos: ProdutosSelectors.getProdutos(state),
    token: LoginSelectors.getToken(state),
    userId: LoginSelectors.getUserId(state)
  };
};

const mapsDispatchToProps = dispatch => {
  return {
    getProdutos: (token) =>
      dispatch(ProdutosActions.getProdutos(token)),
    createVenda: (token, data) =>
      dispatch(VendasConsumoActions.createVenda({token, data}))
  }
}

export default connect(
  mapStateToProps,
  mapsDispatchToProps
)(ProductList);
