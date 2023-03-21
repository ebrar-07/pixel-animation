# Simple Game in Javascript

Dieses Projekt ist ein einfaches Spiel in Javascript. Es zeigt eine Top-Down Ansicht 
von einem Spieler, der sich auf einer Karte bewegen kann.

Das Spiel kann [hier](https://cedricgeissmann.github.io/pixel-animation) direkt getestet werden.

# Changes

## v1.6

Es ist nun möglich mit mehreren Spielern zu spielen.

- Das Eingabesystem wurde überarbeitet. Eingaben werden nun in `config.js` angegeben.

## v1.5

Der Code wurde eine wenig umstrukturiert. Dort wo möglich wurden statische Variablen verwendet (Vorsicht bei Grossschreibung von Klassen). Es wurden ausserdem noch Helferfunktionen hinzugefügt und ein neues Kollisions-Tag.

- Kollisions-Tag `cave`: Neu gibt es die Möglichkeit mit Objekten vom Typ `cave` zu kollidieren. Als Antwort auf die Kollision kann zum Beispiel eine neue Karte geladen werden.

- Neue Karte laden: Die Klasse `Game` hat eine statische Funktion `loadMap(mapname)` erhalten. Damit kann eine neue Karte geladen werden.
**Achtung**: Der Spieler wird dabei neu erstellt, alle Änderungen während des Spiels gehen also verloren.

- `TileRegistry` und `CollisionDetector` haben eine Funktion `clear` erhalten. Damit können alle Tiles gelöscht werden. Dies ist praktisch, wenn Sie eine neue Karte laden.

- Weitere kleine Änderungen die keine grosse Auswirkung haben.