declare name "ALVIN LUCIER - I'M SITTING IN A ROOM (1969)";
declare version "0.1.0";
declare author "Giuseppe Silvi";
declare license "GNU-GPL-v3";
declare copyright "(c)SEAM 2019";
declare options "[midi:on]";

//-------------------------------------------------
// Alvin Lucier - I'm sitting in a room
//-------------------------------------------------

import("stdfaust.lib");
import("../faust-libraries/seam.lib");

maxdel = ma.SR *(180);

gain = vslider("[1] [midi:ctrl 88]", 0, -70, +6, 0.1) : ba.db2linear : si.smoo;

B = checkbox("[1] Uncheck me after the incipit (max 180s)");
I = int(B);
R = (I-I') <= 0; // Clear
D = (+(I):*(R))~_; // Caompuite the delay time during Incipit

L = checkbox("[2] I'm Sitting... Uncheck me at the end");	//
IL = int(L); // convert button signal from float to integer

ctrlgroup(x) = hgroup("[02]", x);

process = ctrlgroup(chstrip) :
          vgroup("[01] -------> Check both boxes to start <-------", *(IL) : de.delay(maxdel, D-1)) :
          ctrlgroup(hgroup("[03] ", *(gain) : vmeter));

//================= Environment - Tweaked from faust examples ===============
// it will be included into SEAM.lib

hmeter(x)	= attach(x, envelop(x) : hbargraph("[2][unit:dB]", -46, +5));
vmeter(x)	= attach(x, envelop(x) : vbargraph("[2][unit:dB]", -46, +5));
envelop = abs : max ~ -(1.0/ma.SR) : max(ba.db2linear(-46)) : ba.linear2db;
