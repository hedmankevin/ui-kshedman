import 'package:flutter/material.dart';
import 'package:flutter/semantics.dart';
import 'package:flutter/services.dart';
import 'package:flutter/material.dart';
import 'package:flutter/painting.dart';

void main() {
  runApp(const RockShopApp());
}

class RockShopApp extends StatelessWidget {
  const RockShopApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Rock Shop',
      theme: ThemeData(primarySwatch: Colors.teal),
      home: const RockInventoryPage(),
    );
  }
}

class RockInventoryPage extends StatefulWidget {
  const RockInventoryPage({super.key});

  @override
  State<RockInventoryPage> createState() => _RockInventoryPageState();
}

class _RockInventoryPageState extends State<RockInventoryPage> {
  final List<String> _rocks = [
    "Amethyst", "Quartz", "Obsidian", "Jade", "Lapis Lazuli", "Tiger's Eye",
    "Rose Quartz", "Citrine", "Agate", "Garnet", "Sodalite", "Fluorite"
  ];

  String _searchQuery = '';
  bool _showInventory = true;

  @override
  Widget build(BuildContext context) {
    final filteredRocks = _rocks
        .where((rock) => rock.toLowerCase().contains(_searchQuery.toLowerCase()))
        .toList();

    return Scaffold(
      appBar: AppBar(title: const Text('Rock Shop Inventory')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              key: const Key('searchField'),
              decoration: const InputDecoration(labelText: 'Search rocks...'),
              onChanged: (value) => setState(() {
                _searchQuery = value;
              }),
            ),
            const SizedBox(height: 16),
            ElevatedButton(
              key: const Key('toggleButton'),
              onPressed: () => setState(() {
                _showInventory = !_showInventory;
              }),
              child: Text(_showInventory ? 'Hide Inventory' : 'Show Inventory'),
            ),
            const SizedBox(height: 16),
            if (_showInventory)
              Expanded(
                child: ListView.builder(
                  key: const Key('rockList'),
                  itemCount: filteredRocks.length,
                  itemBuilder: (context, index) {
                    return ListTile(title: Text(filteredRocks[index]));
                  },
                ),
              ),
          ],
        ),
      ),
    );
  }
}
