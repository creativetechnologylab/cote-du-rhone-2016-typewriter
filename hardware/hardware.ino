#include <Metro.h>

Metro buttonCheckTimer = Metro( 50 );
boolean buttonsPrevState[ numBtns ];

int buttons[] = { 53, 52, 51, 50, 49, 48, 47, 46, 45, 44, 43, 42, 41, 40, 39, 38, 37, 36,
                  35, 34, 33, 32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20 };
             
void setup() {
  Serial.begin( 115200 );
  for ( int i = 0; i < numBtns; i++ ){
    pinMode( buttons[i], INPUT_PULLUP );
  }
}

void loop() {  
  if (buttonCheckTimer.check()){
    for ( int i = 0; i < numBtns; i++ ) {
      boolean buttonState = ! digitalRead( buttons[i] );
      if (buttonState) {
        Serial.println(padInt( buttons[i]));
        delay(250);
      }
    }
  }
}

String padInt( int input ) {
  String output = String( input );
  if ( input < 10 )
    output = "0" + output;
  return output;
}

