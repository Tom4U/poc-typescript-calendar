## **Hinweis**
Es handelt sich hier um ein reines **Proof-of-Concept** Projekt und ist <u>**nicht**</u> für produktive Umgebungen geeignet!

<hr>

# TypeScript Calendar App

## Beschreibung
Während eines 3-tägigen TypeScript Seminars haben wir dieses kleine Projekt aufgebaut. 

Dabei sollten unterschiedliche Ansätze und Vorgehensweisen Schritt für Schritt umgesetzt werden bis am Ende eine vollwertige Webseite steht, die mit Unterstützung eines Build-Prozesses während der Entwicklung die Dateien automatisch aktualisiert.

Es wurde dabei viel Wert darauf gelegt so weit wie möglich mit "Onboard" Technologien und Mitteln zu arbeiten. Es wurde also z.B. bewusst auf Packer wie Webpack, Grunt oder Gulp verzichtet und der Kalender wird selbst und ohne zusätzliche NPM-Pakete generiert.

## Struktur von Components
Alle Components müssen im Ordner `components` liegen.

Für den Fall, dass eine Component (*Parent*) selbst weitere Components (*Child*) liefert **können** diese optional erst in der Parent-Component registriert werden und **müssen** in einem Unterordner erster Ebene liegen.

**Beispiel:** <br>
Parent-Component ist `tasks` und Child-Component ist `tasks-list`, dann wäre die resultierende Struktur:
```
|-- components
|   |-- tasks
|   |   |-- tasks-list
```

## Namenskonventionen von Components
* Ordner und TypeScript-Dateinamen müssen im **kebab-case** Stil benannt werden.
* Component-Klassennamen müssen mit `Component` enden und dem Ordnernamen im **PascalCase** Stil entsprechen.

  **Beispiel:**<br>
  Liegt eine Component unterhalb von `components/my-widget`, so muss der Klassenname `MyWidgetComponent` lauten.
* Child-Components müssen in ihrem Namen am Anfang den Namen der Parent-Component beinhalten.

  **Beispiel:**
   1. Parent-Component ist `tasks`<br>
      Registriert `tasks-list` und optional `tasks-list-item`
   2. Erste Child Component ist `tasks-list`<br>
      Registriert `tasks-list-item`, falls nicht bereits in `tasks` registriert.
   3. Child Component von `tasks-list` ist `tasks-list-item`
