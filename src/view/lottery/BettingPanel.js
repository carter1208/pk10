/**
 * Created by carter on 9/13/2018.
 */
import React,{Component} from 'react';
import PositionSub from '../lottery/PositionSub'
import CombineSub from '../lottery/CombineSub'
import SumSub from '../lottery/SumSub'
import BetPlaceGroupPos from '../lottery/BetPlaceGroupPos'
import BetPlaceGroupDt from '../lottery/BetPlaceGroupDt'
import BetPlaceGroupSum2 from '../lottery/BetPlaceGroupSum2'
import BetPlaceGroupSum3 from '../lottery/BetPlaceGroupSum3'
import BetPlaceGroupCombine from '../lottery/BetPlaceGroupCombine'
import BetValue from '../lottery/BetValue'
import ChipSettingPanel from "./ChipSettingPanel";
import {model} from '../../model/Model'
import {gameServer} from '../../controller/GameServer'
import Command from '../../constant/Command'
import {T} from '../../model/language/Translator'
import BetDetailPanel from "./BetDetailPanel";

export default class BettingPanel extends Component{
    constructor(props){
        super();
        this.currItem = null;
        this.state ={
            subMenu:'position'
        }
    }
    componentDidMount() {
        model.subscribe(Command.UPDATE_BETTING, this);
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
        this.refs.combine.showCombineBet(id);
        this.updateOdd();
    }

    activeSubMenu(){
        this.refs[this.state.subMenu].getValue();
    }

    hdlClick(e){
        var p = $(e.currentTarget).position();
        this.currItem = e.currentTarget;
        this.refs.betvalue.updateList(true, p.left, p.top);
    }

    chooseBetValue(value){
        this.currItem.value = value;
    }

    getValueByGroup(group){
        let val = 0;
        let betPlaceInfo;
        for (let i = 0; i < model.listBetPlaceInfo.length; i++)
        {
            betPlaceInfo = model.listBetPlaceInfo[i];
            if (betPlaceInfo.groupName != group)
            {
                continue;
            }
            if (isNaN(betPlaceInfo.tempValue))
                betPlaceInfo.tempValue = 0;
            val += betPlaceInfo.tempValue;
        }
        return val;
    }

    onBlur(e){
        this.refs.betvalue.updateList(false, 0, 0);
        let total = this.getValueByGroup(this.state.subMenu);
        if(total > 0) {
            document.getElementById(this.state.subMenu + '_tick').style.visibility = 'visible';
        }else {
            document.getElementById(this.state.subMenu + '_tick').style.visibility = 'hidden';
        }
    }

    confirmBet(e){
        let obj = JSON.parse('{"data":{"result":{"ListBetDetail":[{"Status":"T","Odds":"8.07","AgAccBetAmt":100,"BetAmt":200,"BetCodeID":"3386","BetCode":"Lo1-1","AccBetAmt":100},{"Status":"SplitBetCode","Odds":8.06,"AgAccBetAmt":100,"BetAmt":200,"BetCodeID":"3386","BetCode":"Lo1-1","AccBetAmt":100},{"Status":"T","Odds":"119.69","AgAccBetAmt":100,"BetAmt":200,"BetCodeID":"3387","BetCode":"Lo1-2","AccBetAmt":100},{"Status":"SplitBetCode","Odds":9.68,"AgAccBetAmt":100,"BetAmt":200,"BetCodeID":"3387","BetCode":"Lo1-2","AccBetAmt":100},{"Status":"T","Odds":"9.69","AgAccBetAmt":100,"BetAmt":200,"BetCodeID":"3388","BetCode":"Lo1-3","AccBetAmt":100},{"Status":"SplitBetCode","Odds":9.68,"AgAccBetAmt":100,"BetAmt":200,"BetCodeID":"3388","BetCode":"Lo1-3","AccBetAmt":100},{"Status":"T","Odds":"9.69","AgAccBetAmt":100,"BetAmt":200,"BetCodeID":"3389","BetCode":"Lo1-4","AccBetAmt":100},{"Status":"SplitBetCode","Odds":9.68,"AgAccBetAmt":100,"BetAmt":200,"BetCodeID":"3389","BetCode":"Lo1-4","AccBetAmt":100},{"Status":"T","Odds":"9.69","AgAccBetAmt":100,"BetAmt":200,"BetCodeID":"3393","BetCode":"Lo1-8","AccBetAmt":100},{"Status":"SplitBetCode","Odds":9.68,"AgAccBetAmt":100,"BetAmt":200,"BetCodeID":"3393","BetCode":"Lo1-8","AccBetAmt":100},{"Status":"T","Odds":"9.79","AgAccBetAmt":100,"BetAmt":200,"BetCodeID":"3394","BetCode":"Lo1-9","AccBetAmt":100},{"Status":"SplitBetCode","Odds":9.78,"AgAccBetAmt":100,"BetAmt":200,"BetCodeID":"3394","BetCode":"Lo1-9","AccBetAmt":100},{"Status":"DBOverUpperLimit","Odds":9.78,"AgAccBetAmt":100,"BetAmt":200,"BetCodeID":"3394","BetCode":"Lo1B","AccBetAmt":100}],"AvailCredit":2170.053,"TbID":79,"TrID":"634dbc216"},"errorMessage":"","error":0}}');
        // let obj = JSON.parse('{"data":{"result":{"ListBetDetail":[{"Status":"T","Odds":"8.07","AgAccBetAmt":100,"BetAmt":200,"BetCodeID":"3386","BetCode":"Lo1-1","AccBetAmt":100},{"Status":"SplitBetCode","Odds":8.06,"AgAccBetAmt":100,"BetAmt":200,"BetCodeID":"3386","BetCode":"Lo1-1","AccBetAmt":100},{"Status":"T","Odds":"9.69","AgAccBetAmt":100,"BetAmt":200,"BetCodeID":"3387","BetCode":"Lo1-2","AccBetAmt":100},{"Status":"SplitBetCode","Odds":9.68,"AgAccBetAmt":100,"BetAmt":200,"BetCodeID":"3387","BetCode":"Lo1-2","AccBetAmt":100}],"AvailCredit":2170.053,"TbID":79,"TrID":"634dbc216"},"errorMessage":"","error":0}}');
        gameServer.onExtensionResponse(Command.UPDATE_BETTING,obj);
    }

    clearBet(){}

    quickChange(e){
        this.refs.chipSetting.show();
    }

    updateOdd(){
        this.refs[this.state.subMenu].updateOdd();
    }
    updateBetting(data){
        this.refs.betDetail.updateBetting(data);
    }

    update(command, data) {
        switch (command) {
            case Command.GET_ODD_LIVE:
                this.updateOdd();
                break;
            case Command.UPDATE_BETTING:
                this.updateBetting(data);
                break;
        }
    }

    render() {
        let jsxSub = <PositionSub/>;
        let jsxBetPlace = <BetPlaceGroupPos onClickBet={this.hdlClick.bind(this)} onBlurBet={this.onBlur.bind(this)}/>;
        model.subMenu = '';
        switch (this.state.subMenu) {
            case  'position':
                jsxSub = (
                    <PositionSub changeSub={this.activeSubMenu.bind(this)}/>
                );
                jsxBetPlace = (
                    <BetPlaceGroupPos ref="position" onClickBet={this.hdlClick.bind(this)} onBlurBet={this.onBlur.bind(this)}/>
                );
                break;
            case  'dt':
                jsxSub = (
                    <SumSub/>
                );
                jsxBetPlace = (
                    <BetPlaceGroupDt ref="dt" onClickBet={this.hdlClick.bind(this)} onBlurBet={this.onBlur.bind(this)}/>
                );
                break;
            case  'combine':
                jsxSub = (
                    <CombineSub hdlChangeSub={this.hdlActiveCombine.bind(this)}/>
                );
                jsxBetPlace = (
                    <BetPlaceGroupCombine ref="combine" onClickBet={this.hdlClick.bind(this)} onBlurBet={this.onBlur.bind(this)}/>
                );
                break;
            case  'sum2':
                jsxSub = <SumSub/>
                jsxBetPlace = (
                    <BetPlaceGroupSum2 ref="sum2" onClickBet={this.hdlClick.bind(this)} onBlurBet={this.onBlur.bind(this)}/>
                );
                break;
            case  'sum3':
                jsxSub = <SumSub/>
                jsxBetPlace = (
                    <BetPlaceGroupSum3 ref="sum3" onClickBet={this.hdlClick.bind(this)} onBlurBet={this.onBlur.bind(this)}/>
                );
                break;
        }
        return (
            <div className="betting">
                <div className="btn-group">
                    <button type="button" id ='position' className="active" onClick={this.show.bind(this)}>{T.translate('lblPosition').toUpperCase()}
                        <div className="img" id="position_tick" style={{visibility:'hidden'}}>
                            <img src="img/tick.png" width='12px' height='12px' style={{float:'right'}}/>
                        </div>
                    </button>
                    <button type="button" id='dt' onClick={this.show.bind(this)}>{T.translate('lblDT').toUpperCase()}
                        <div className="img" id="dt_tick" style={{visibility:'hidden'}}>
                            <img src="img/tick.png" width='12px' height='12px' style={{float:'right'}}/>
                        </div>
                    </button>
                    <button type="button" id='sum2' onClick={this.show.bind(this)}>{T.translate('lblSum2').toUpperCase()}
                        <div className="img" id="sum2_tick" style={{visibility:'hidden'}}>
                            <img src="img/tick.png" width='12px' height='12px' style={{float:'right'}}/>
                        </div>
                    </button>
                    <button type="button" id='sum3' onClick={this.show.bind(this)}>{T.translate('lblSum3').toUpperCase()}
                        <div className="img" id="sum3_tick" style={{visibility:'hidden'}}>
                            <img src="img/tick.png" width='12px' height='12px' style={{float:'right'}}/>
                        </div>
                    </button>
                    <button type="button" id ='combine' onClick={this.show.bind(this)}>{T.translate('lblCombine').toUpperCase()}
                        <div className="img" id="combine_tick" style={{visibility:'hidden'}}>
                            <img src="img/tick.png" width='12px' height='12px' style={{float:'right'}}/>
                        </div>
                    </button>
                </div>
                {jsxSub}
                <div style={{height:'145px'}}>
                    {jsxBetPlace}
                </div>
                <div className="btn-confirm">
                    <div className="control">
                        <button type="button" id ='confirm' onClick={this.confirmBet.bind(this)}>{T.translate('btnConfirm').toUpperCase()}</button>&nbsp;
                        <button type="button" id ='clear' onClick={this.clearBet.bind(this)}>{T.translate('btnClear').toUpperCase()}</button>
                    </div>
                    <div className="setting">
                        <button type="button" id ='quick' onClick={this.quickChange.bind(this)}>{T.translate('lbQuickChange').toUpperCase()}</button>
                    </div>
                </div>
                <BetValue ref="betvalue" onClickItem={this.chooseBetValue.bind(this)}/>
                <ChipSettingPanel ref="chipSetting"/>
                <BetDetailPanel ref="betDetail"/>
            </div>

        )
    }
}