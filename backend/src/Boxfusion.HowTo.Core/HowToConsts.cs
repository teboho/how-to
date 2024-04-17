using Boxfusion.HowTo.Debugging;

namespace Boxfusion.HowTo
{
    public class HowToConsts
    {
        public const string LocalizationSourceName = "HowTo";

        public const string ConnectionStringName = "Default";

        public const bool MultiTenancyEnabled = true;


        /// <summary>
        /// Default pass phrase for SimpleStringCipher decrypt/encrypt operations
        /// </summary>
        public static readonly string DefaultPassPhrase =
            DebugHelper.IsDebug ? "gsKxGZ012HLL3MI5" : "00787bc15dba4aa486524ffd49591509";
    }
}
