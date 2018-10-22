/**
 * Created by loc on 6/9/2017.
 */
import React, {Component, PropTypes} from 'react';
import {model} from "../../model/Model";
import Command from "../../constant/Command";
import DisplayUtil from '../util/DisplayUtil';
export default class UserPanel extends Component{
    constructor(props) {
        super(props);
        this.state = {
            userName:model.loginName,
            balance:model.userInfo.balance,
            commissionRate:model.userInfo.commissionRate,
            bonus:model.userInfo.bonus,
            showBonus:false,
            total:(parseFloat(model.userInfo.balance) + parseFloat(model.userInfo.bonus)).toFixed(2),
            txtBalance:(parseFloat(model.userInfo.balance) + parseFloat(model.userInfo.bonus)).toFixed(2)
        }
    }
    componentDidMount() {
        // model.subscribe(Command.PERSON_INFO, this);
    }
    componentWillUnmount() {
        // model.unsubscribe(Command.PERSON_INFO, this);
    }
    update(command, data) {
        if (command == Command.PERSON_INFO) {
            this.setState({
                userName:model.loginName,
                balance:data.Credit,
                commissionRate:data.CommRate,
                bonus:data.BonusCredit,
                total:(parseFloat(data.Credit).toFixed(2) + parseFloat(data.BonusCredit).toFixed(2)).toFixed(2),
                txtBalance:this.state.total
            });
        }
    }

    showBonus(e){
        e.preventDefault();
        if(!this.state.showBonus){
            $('.bonus').addClass('active')
            this.setState({txtBalance:this.state.balance})
        }else {
            $('.bonus').removeClass('active')
            this.setState({txtBalance:this.state.total})
        }

        this.state.showBonus = !this.state.showBonus;
    }

    onBlur(e){
        $('.bonus').removeClass('active')
        this.setState({
            showBonus:false,
            txtBalance:this.state.total
        });
    }

    setStatus(){
        $('.bonus').removeClass('active')
        this.setState({txtBalance:this.state.total})
    }

    render() {
        return (
            <div className="user-info">
                <div className="userName">
                        <span>{this.state.userName}</span>
                </div>
                &emsp;
                <div className="userItem" tabIndex={0} onClick={this.showBonus.bind(this)} onBlur={this.onBlur.bind(this)}>
                    <div className="txt">
                        <span>{this.state.txtBalance}</span>
                        <div className="bonus">
                            <div className="tooltiptext"></div>
                            {DisplayUtil.formatCurrency(this.state.bonus, 2, '')}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
