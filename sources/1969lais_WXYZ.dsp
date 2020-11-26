declare name "ALVIN LUCIER - I am SITTING IN A ROOM (1969) - AMBISONIC VERSION";
declare version "010";
declare author "Giuseppe Silvi";
declare license "GNU-GPL-v3";
declare copyright "(c)SEAM 2019";
declare description "Alvin Lucier, I am sitting in a room - live electronic ambisonic model";
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

fader = *(g88), *(g88), *(g88), *(g88);
meters = svmeter, svmeter, svmeter, svmeter;

process = ctrlgroup(wxyzrip) : main, main, main, main : ctrlgroup(hgroup("[03] ", fader : meters));
