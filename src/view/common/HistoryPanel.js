/**
 * Created by carter on 10/29/2018.
 */
import React,{Component} from 'react';
import {model} from '../../model/Model'
import {T} from '../../model/language/Translator'
import HistoryView from './HistoryView'
import * as PIXI from 'pixi.js';
export default class HistoryPanel extends Component{
    constructor(props){
        super(props);
        this.arrMenu = ['bigSmall', 'oddEven', 'sumPoint'];
        this.arrMenuDt = ['1V10', '2V9', '3V8', '4V7', '5V6'];
        this.type = '1';
        this.key = 'bigSmall';
        this.state ={
            arr:this.arrMenu,
            arrRes:this.props.arrRes
        }
    }

    componentDidMount() {
        this.init();
    }

    onCLick(e){
        e.preventDefault();
        $('div').removeClass('his-sub-active');
        $('div').removeClass('sub-is-active');
        $(e.currentTarget).addClass('his-sub-active');
        this.type = e.currentTarget.id;
        if(e.currentTarget.id == '11'){
            this.key = this.arrMenuDt[0];
            this.setState({
                arr:this.arrMenuDt,
            });
        }else {
            this.key = this.arrMenu[0];
            this.setState({
                arr:this.arrMenu,
            });
        }
        var div = document.getElementsByClassName('his-menu')[0];
        $(div).addClass('sub-is-active');
        this.updateHistory();
    }

    activeSubMenu(e){
        e.preventDefault();
        $('div').removeClass('sub-is-active');
        $(e.currentTarget).addClass('sub-is-active');
        this.key = e.currentTarget.id;
        this.updateHistory();
    }

    init() {
        this.app = new PIXI.Application(740, 105, {backgroundColor: 'transparent', transparent: true});
        this.refs.canvasHistoryContainer.appendChild(this.app.view);
        this.stage = new PIXI.Container();
        this.historyView = new HistoryView();
        this.historyView.init(738, 104, 40, 6, true);
        this.stage.addChild(this.historyView);

        this.app.stage.addChild(this.stage);
        this.animate.bind(this);
        this.updateHistory();
    }

    animate() {
        this.frame = requestAnimationFrame(this.animate);
        this.app.renderer.render(this.stage);
    }

    updateHistory(){
        this.historyView.setData(this.state.arrRes, this.key, this.type)
    }

    render() {
        let jsxMenu = [];
        let h = 105/this.state.arr.length;
        let classext = '';
        for (let i=0; i < this.state.arr.length; i++){
            classext = (i == 0 ? ' sub-is-active':'');
            jsxMenu.push(<div key={i} id={this.state.arr[i]} className={"his-menu" + classext} style={{height:h+'px', lineHeight:h+'px'}} onClick={this.activeSubMenu.bind(this)}>
                {T.translate(this.state.arr[i])}
            </div>);
        }
        return (
            <div className="history-panel">
                <div className="sub">
                    <div className="his-sub-active" id='1' onClick={this.onCLick.bind(this)}>{T.translate('lbl1').toUpperCase()}</div>
                    <div id='2' onClick={this.onCLick.bind(this)}>{T.translate('lbl2').toUpperCase()}</div>
                    <div id='3' onClick={this.onCLick.bind(this)}>{T.translate('lbl3').toUpperCase()}</div>
                    <div id='4' onClick={this.onCLick.bind(this)}>{T.translate('lbl4').toUpperCase()}</div>
                    <div id='5' onClick={this.onCLick.bind(this)}>{T.translate('lbl5').toUpperCase()}</div>
                    <div id='6' onClick={this.onCLick.bind(this)}>{T.translate('lbl6').toUpperCase()}</div>
                    <div id='7' onClick={this.onCLick.bind(this)}>{T.translate('lbl7').toUpperCase()}</div>
                    <div id='8' onClick={this.onCLick.bind(this)}>{T.translate('lbl8').toUpperCase()}</div>
                    <div id='9' onClick={this.onCLick.bind(this)}>{T.translate('lbl9').toUpperCase()}</div>
                    <div id='10' onClick={this.onCLick.bind(this)}>{T.translate('lbl10').toUpperCase()}</div>
                    <div className="dt" id='11' onClick={this.onCLick.bind(this)}>{T.translate('lblDT').toUpperCase()}</div>
                    <div id='12' className="sum2" onClick={this.onCLick.bind(this)}>{T.translate('lblSum2').toUpperCase()}</div>
                    <div id='13' className="sum3" onClick={this.onCLick.bind(this)}>{T.translate('lblSum3').toUpperCase()}</div>
                </div>
                <div className="left-menu-his" style={{float:'left', width:'90px'}}>
                    {jsxMenu}
                </div>
                <div className="his-content" style={{float:'right', width:'740px'}}>
                    <div ref="canvasHistoryContainer"></div>
                </div>
            </div>
        )
    }
}
