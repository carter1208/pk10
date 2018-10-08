/**
 * Created by carter on 7/4/2017.
 */

export default class ErrorCode
{
    static TOKEN_INVALID			 = "TokenInvalid";
    static REPEATED_LOGIN			 = "RepeatedLogin";
    static SESSION_NOT_EXISTS		 = "SessionDoesNotExists";
    static SESSION_EXPIRED			 = "SessionHasExpired";
    static SESSION_KICKOUT			 = "SessionHasKickout";

    static MANUAL					 = "manual";
    static SERVICE_TIMEOUT			 = "serviceTimeout";

    static IDLE_TIMEOUT			     = "over10minutes";

    constructor()
    {

    }

}
