declare name "ALVIN LUCIER - I am SITTING IN A ROOM (1969)";
declare version "010";
declare author "Giuseppe Silvi";
declare license "GNU-GPL-v3";
declare copyright "(c)SEAM 2019";
declare description "Alvin Lucier, I am sitting in a room - live electronic model";
declare options "[midi:on] [httpd:on]";

import("stdfaust.lib");
import("../faust-libraries/seam.lib");

ctrlgroup(x) = hgroup("[02]", x);

main = vgroup("[01] Check both boxes to start",
  *(L) : de.delay(maxdel, D-1))
  with{
    maxdel = ma.SR *(180);
    I = int(checkbox("[01] Uncheck me after the incipit"));
    // Clear
    R = (I-I') <= 0;
    // Compute the delay time during Incipit
    D = (+(I):*(R))~_;
    L = int(checkbox("[02] I am Sitting... Uncheck me at the end"));
  };

process = ctrlgroup(chstrip) : main : ctrlgroup(hgroup("[03] ", *(g88) : svmeter));
