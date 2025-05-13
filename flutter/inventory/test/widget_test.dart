import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:inventory/main.dart';  // Ensure this is correct

void main() {
  testWidgets('Rock Inventory UI Test', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(const RockShopApp());

    // Check for the search field and toggle button
    expect(find.byKey(const Key('searchField')), findsOneWidget);
    expect(find.byKey(const Key('toggleButton')), findsOneWidget);

    // Verify that the inventory list is initially shown
    expect(find.byKey(const Key('rockList')), findsOneWidget);

    // Enter a search query and trigger a frame.
    await tester.enterText(find.byKey(const Key('searchField')), 'jade');
    await tester.pump();

    // Verify the filtered result is displayed
    expect(find.text('Jade'), findsOneWidget);
    expect(find.text('Amethyst'), findsNothing);  

    // Toggle the inventory visibility off
    await tester.tap(find.byKey(const Key('toggleButton')));
    await tester.pump();

    // Verify the inventory list is hidden
    expect(find.byKey(const Key('rockList')), findsNothing);

    // Toggle the inventory visibility back on
    await tester.tap(find.byKey(const Key('toggleButton')));
    await tester.pump();

    // Verify the inventory list is shown again
    expect(find.byKey(const Key('rockList')), findsOneWidget);
  });
}