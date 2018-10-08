export default class DisplayUtil {
    static SCALE_STRETCH				 = "stretch";
    static SCALE_PROPORTIONAL_INSIDE	 = "proportional_inside";
    static SCALE_PROPORTIONAL_OUTSIDE    = "proportional_outside";
    static SCALE_WIDTH_ONLY			     = "width_only";
    static SCALE_HEIGHT_ONLY			 = "height_only";
    static SCALE_NONE				     = "none	";

    static toggleFullscreen() {
        if ((document.fullScreenElement && document.fullScreenElement !== null) ||
            (!document.mozFullScreen && !document.webkitIsFullScreen)) {
            if (document.documentElement.requestFullScreen) {
                document.documentElement.requestFullScreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullScreen) {
                document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        }
    }

    static backgroundStyle(url, size="", param = "") {
        // return {
        //     backgroundImage: "url(" + url + ")",
        //     backgroundRepeat: "no-repeat",
        //     backgroundSize: "100% 100%"
        // }
        let objStyle = {};
        objStyle.background = "url(" + url + ")" + (param != "" ? param : " no-repeat top center");

        if (size != "") {
            objStyle.backgroundSize = size;
        } else {
            objStyle.backgroundSize = "100% 100%";
        }
        return objStyle;
    }

    static drawGridCanvas(context, tbWidth, tbHeight, tbCol, tbRow, colorStroke, colorFill) {

        let i = 0;

        let cw = tbWidth / tbCol;
        let ch = tbHeight / tbRow;
        context.fillStyle = colorFill;
        context.fillRect(0,0, tbWidth, tbHeight);
        context.strokeStyle = colorStroke;
        context.lineWidth = 1;
        context.strokeRect(0, 0, tbWidth, tbHeight);

        for (i = 0; i < tbRow; i++) {
            context.moveTo(1, i * ch);
            context.lineTo(tbWidth-1, i * ch);
        }
        for (i = 0; i < tbCol; i++) {
            context.moveTo(i * cw, 1);
            context.lineTo(i * cw, tbHeight - 1);
        }
        context.stroke();
    }

    static drawGridStroke(tbGraphic, tbWidth, tbHeight, tbCol, tbRow, colorStroke = 0x000000, colorFill = 0xFFFFFF) {
        let i = 0;
        let cw = tbWidth / tbCol;
        let ch = tbHeight / tbRow;
        tbGraphic.beginFill(colorFill);
        tbGraphic.lineStyle(1, colorStroke);
        tbGraphic.drawRect(0, 0, tbWidth, tbHeight);
        for (i = 0; i < tbRow; i++) {
            tbGraphic.moveTo(1, i * ch);
            tbGraphic.lineTo(tbWidth-1, i * ch);
        }
        for (i = 0; i < tbCol; i++) {
            tbGraphic.moveTo(i * cw, 1);
            tbGraphic.lineTo(i * cw, tbHeight - 1);
        }
        tbGraphic.endFill();
    }

    static drawGridFill(tbGraphic, tbWidth, tbHeight, tbCol, tbRow, color1 = 0x000000, color2 = 0xFFFFFF) {
        let i;
        let cw = tbWidth / tbCol;
        let ch = tbHeight / tbRow;
        for (let j = 0; j < tbRow; j++)
        {
            for (let k = 0; k < tbCol; k++)
            {
                if (j % 2 == 0)
                {
                    if (k % 2 == 0)
                    {
                        tbGraphic.beginFill(color1);
                        tbGraphic.drawRect(cw * k, ch * j, cw, ch);
                    }
                    else
                    {
                        tbGraphic.beginFill(color2);
                        tbGraphic.drawRect(cw * k, ch * j, cw, ch);
                    }
                }
                else
                {
                    if (k % 2 == 0)
                    {
                        tbGraphic.beginFill(color2);
                        tbGraphic.drawRect(cw * k, ch * j, cw, ch);
                    }
                    else
                    {
                        tbGraphic.beginFill(color1);
                        tbGraphic.drawRect(cw * k, ch * j, cw, ch);
                    }
                }
            }
        }
        tbGraphic.endFill();
    }

    static formatCurrency(num, decimalPlace, currency) {
        //assigns true boolean value to neg in number less than 0
        var neg = (num < 0);

        //make the number positive for easy conversion
        num = Math.abs(num);
        //not round
        var str = num.toString();
        var tem = str.split(".");
        if (tem.length > 1)
        {
            str = tem[1];
            str = str.substr(0, 2);
            num = Number(tem[0] + "." + str);
        }
        //end
        var roundedAmount = String(num.toFixed(decimalPlace)); //do round

        //split string into array for dollars and cents
        var amountArray = roundedAmount.split(".");
        var dollars = amountArray[0];
        var cents = amountArray[1];
        //create dollar amount
        var dollarFinal = "";
        var i = 0;
        for (i; i < dollars.length; i++)
        {
            if (i > 0 && (i % 3 == 0))
            {
                dollarFinal = "," + dollarFinal;
            }

            dollarFinal = dollars.substr(-i - 1, 1) + dollarFinal;
        }

        //create Cents amount and zeros if necessary
        var centsFinal = String(cents);

        var missingZeros = decimalPlace - centsFinal.length;

        if (centsFinal.length < decimalPlace)
        {
            for (var j = 0; j < missingZeros; j++)
            {
                centsFinal += "0";
            }
        }

        var finalString = "";

        if (neg)
        {
            finalString = "-" + currency + dollarFinal;
        }
        else
        {
            finalString = currency + dollarFinal;
        }

        if (decimalPlace > 0)
        {
            finalString += "." + centsFinal;
        }
        return finalString;
    }

    static removeDisplayObject(obj) {
        while (obj.children.length > 0) {
            obj.removeChild(obj.children[0]);
        }
    }

    static removeAllChild(context) {
        if (context) {
            context.clearRect(0,0,context.canvas.width, context.canvas.height);
        }
    }

    static scale(mc, boundWidth = 0, boundHeight = 0, mode = DisplayUtil.SCALE_NONE) {
        let ratio;
        switch (mode) {
            case DisplayUtil.SCALE_STRETCH:
                mc.width = boundWidth;
                mc.height = boundHeight;
                break;
            case DisplayUtil.SCALE_PROPORTIONAL_INSIDE:
                ratio = Math.min(boundWidth / 25, boundHeight / 25);
                mc.scale.x = mc.scale.y = ratio;
                break;
            case DisplayUtil.SCALE_PROPORTIONAL_OUTSIDE:
                ratio = Math.max(boundWidth / mc.width, boundHeight / mc.height);
                mc.scale.x = mc.scale.y = ratio;
                break;
            case DisplayUtil.SCALE_WIDTH_ONLY:
                mc.width = boundWidth;
                mc.scale.y = mc.scale.x;
                break;
            case DisplayUtil.SCALE_HEIGHT_ONLY:
                mc.height = boundHeight;
                mc.scale.x = mc.scale.y;
                break;
        }
    }
}
