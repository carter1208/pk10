/**
 * Created by carter on 9/13/2018.
 */
import React,{Component} from 'react';
import PositionSub from '../lottery/PositionSub'
import DTSub from '../lottery/DTSub'
import CombineSub from '../lottery/CombineSub'
import SumSub from '../lottery/SumSub'
import BetPlaceGroupPos from '../lottery/BetPlaceGroupPos'
import BetPlaceGroupDt from '../lottery/BetPlaceGroupDt'
import BetPlaceGroupSum2 from '../lottery/BetPlaceGroupSum2'
import BetPlaceGroupSum3 from '../lottery/BetPlaceGroupSum3'
import BetPlaceGroupCombine from '../lottery/BetPlaceGroupCombine'
import BetValue from '../lottery/BetValue'

export default class BettingPanel extends Component{
    constructor(props){
        super();
        this.currItem = null;
        this.state ={
            subMenu:PositionSub
        }
    }
    componentDidMount() {

    }

    show(e){
        e.preventDefault();
        $('button').removeClass('active');
        $(e.currentTarget).addClass('active');
       this.setState({subMenu:e.currentTarget.id});
    }

    hdlActiveCombine(id){
        console.log('click combine', id);
        this.refs.bpGroupCombine.showCombineBet(id);
    }

    hdlClick(e){
        var p = $(e.currentTarget).position();
        console.log('click bet', p);
        this.currItem = e.currentTarget;
        this.refs.betvalue.updateList(true, p.left, p.top);
    }

    chooseBetValue(value){
        console.log('chooseBetValue',value);
        this.currItem.value = value;
    }

    onBlur(e){
        console.log('move bet');
        this.refs.betvalue.updateList(false, 0, 0);
    }

    render() {
        let jsxSub = <PositionSub/>;
        let jsxBetPlace = <BetPlaceGroupPos onClickBet={this.hdlClick.bind(this)} onBlurBet={this.onBlur.bind(this)}/>;
        switch (this.state.subMenu) {
            case  'position':
                jsxSub = (
                    <PositionSub/>
                );
                jsxBetPlace = (
                    <BetPlaceGroupPos onClickBet={this.hdlClick.bind(this)} onBlurBet={this.onBlur.bind(this)}/>
                );
                break;
            case  'dt':
                jsxSub = (
                    <DTSub/>
                );
                jsxBetPlace = (
                    <BetPlaceGroupDt onClickBet={this.hdlClick.bind(this)} onBlurBet={this.onBlur.bind(this)}/>
                );
                break;
            case  'combine':
                jsxSub = (
                    <CombineSub hdlChangeSub={this.hdlActiveCombine.bind(this)}/>
                );
                jsxBetPlace = (
                    <BetPlaceGroupCombine ref="bpGroupCombine" onClickBet={this.hdlClick.bind(this)} onBlurBet={this.onBlur.bind(this)}/>
                );
                break;
            case  'sum2':
                jsxSub = <SumSub/>
                jsxBetPlace = (
                    <BetPlaceGroupSum2 onClickBet={this.hdlClick.bind(this)} onBlurBet={this.onBlur.bind(this)}/>
                );
                break;
            case  'sum3':
                jsxSub = <SumSub/>
                jsxBetPlace = (
                    <BetPlaceGroupSum3 onClickBet={this.hdlClick.bind(this)} onBlurBet={this.onBlur.bind(this)}/>
                );
                break;
        }
        return (
            <div className="betting">
                <div className="btn-group">
                    <button type="button" id ='position' className="active" onClick={this.show.bind(this)}>POSITION</button>
                    <button type="button" id='dt' onClick={this.show.bind(this)}>DRAGON/TIGER</button>
                    <button type="button" id='sum2' onClick={this.show.bind(this)}>SUM OF 1ST + 2ND</button>
                    <button type="button" id='sum3' onClick={this.show.bind(this)}>SUM OF 1ST + 2ST + 3RD</button>
                    <button type="button" id ='combine' onClick={this.show.bind(this)}>COMBINE</button>
                </div>
                {jsxSub}
                {jsxBetPlace}
                <BetValue ref="betvalue" onClickItem={this.chooseBetValue.bind(this)}/>
            </div>

        )
    }
}