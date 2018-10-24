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
import ChipSettingPanel from "./ChipSettingPanel";

export default class BettingPanel extends Component{
    constructor(props){
        super();
        this.currItem = null;
        this.state ={
            subMenu:'position'
        }
    }
    componentDidMount() {
    }

    init(){
        this.refs.chipSetting.init();
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
        document.getElementById(this.state.subMenu+'_tick').style.visibility = 'visible';
    }

    onBlur(e){
        console.log('move bet');
        this.refs.betvalue.updateList(false, 0, 0);
    }

    confirmBet(){}

    clearBet(){}

    quickChange(e){
        this.refs.chipSetting.show();
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
                    <SumSub/>
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
                    <button type="button" id ='position' className="active" onClick={this.show.bind(this)}>POSITION
                        <div className="img" id="position_tick" style={{visibility:'hidden'}}>
                            <img src="img/tick.png" width='12px' height='12px' style={{float:'right'}}/>
                        </div>
                    </button>
                    <button type="button" id='dt' onClick={this.show.bind(this)}>DRAGON/TIGER
                        <div className="img" id="dt_tick" style={{visibility:'hidden'}}>
                            <img src="img/tick.png" width='12px' height='12px' style={{float:'right'}}/>
                        </div>
                    </button>
                    <button type="button" id='sum2' onClick={this.show.bind(this)}>SUM OF 1ST + 2ND
                        <div className="img" id="sum2_tick" style={{visibility:'hidden'}}>
                            <img src="img/tick.png" width='12px' height='12px' style={{float:'right'}}/>
                        </div>
                    </button>
                    <button type="button" id='sum3' onClick={this.show.bind(this)}>SUM OF 1ST + 2ST + 3RD
                        <div className="img" id="sum3_tick" style={{visibility:'hidden'}}>
                            <img src="img/tick.png" width='12px' height='12px' style={{float:'right'}}/>
                        </div>
                    </button>
                    <button type="button" id ='combine' onClick={this.show.bind(this)}>COMBINE
                        <div className="img" id="combine_tick" style={{visibility:'hidden'}}>
                            <img src="img/tick.png" width='12px' height='12px' style={{float:'right'}}/>
                        </div>
                    </button>
                </div>
                {jsxSub}
                {jsxBetPlace}
                <div className="btn-confirm">
                    <div className="control">
                        <button type="button" id ='confirm' onClick={this.confirmBet.bind(this)}>CONFIRM</button>&nbsp;
                        <button type="button" id ='clear' onClick={this.clearBet.bind(this)}>CLEAR</button>
                    </div>
                    <button type="button" id ='quick' onClick={this.quickChange.bind(this)}>QUICK CHANGE</button>
                </div>
                <BetValue ref="betvalue" onClickItem={this.chooseBetValue.bind(this)}/>
                <ChipSettingPanel ref="chipSetting"/>
            </div>

        )
    }
}