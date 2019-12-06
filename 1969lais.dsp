declare name "ALVIN LUCIER - I'M SITTING IN A ROOM (1969)";
declare version "001";
declare author "Giuseppe Silvi";
declare license "GNU-GPL-v3";
declare copyright "(c)SEAM 2019";
declare description "Alvin Lucier, I'm sitting in a room - live electronic model";
declare options "[midi:on]";

import("stdfaust.lib");
import("../faust-libraries/seam.lib");

ctrlgroup(x) = hgroup("[02]", x);

main = vgroup("[01] -------> Check both boxes to start <-------", *(IL) : de.delay(maxdel, D-1))
  with{
    maxdel = ma.SR *(180);
    B = checkbox("[1] Uncheck me after the incipit (max 180s)");
    I = int(B);
    R = (I-I') <= 0; // Clear
    D = (+(I):*(R))~_; // Caompuite the delay time during Incipit
    L = checkbox("[2] I'm Sitting... Uncheck me at the end");	//
    IL = int(L); // convert button signal from float to integer
  };

process = ctrlgroup(chstrip) : main : ctrlgroup(hgroup("[03] ", *(g88) : svmeter));
