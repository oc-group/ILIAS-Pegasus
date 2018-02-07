import {Migration, MigrationVersion} from "../services/migration/migration.api";
import {QueryRunner, Table, TableColumn} from "typeorm";

/**
 * Migration for Lernorte 2.0.
 *
 * @author nmaerchy <nm@studer-raimann.ch>
 * @version 0.0.3
 */
export class CreateLearnplace implements Migration {

  readonly version: MigrationVersion = new MigrationVersion("V__3");

  async up(queryRunner: QueryRunner): Promise<void> {

    const learnplace: Table = new Table("Learnplace", [
      new TableColumn({name: "objectId", type: "integer", isPrimary: true, isGenerated: false, isNullable: false})
    ]);

    const visibility: Table = new Table("Visibility", [
      new TableColumn({name: "value", type: "string", length: "128", isPrimary: true, isGenerated: false, isNullable: false})
    ]);

    const location: Table = new Table("Location", [
      new TableColumn({name: "id", type: "integer", isPrimary: true, generationStrategy: "increment", isGenerated: true, isNullable: false}),
      new TableColumn({name: "latitude", type: "double", isNullable: false}),
      new TableColumn({name: "longitude", type: "double", isNullable: false}),
      new TableColumn({name: "elevation", type:"double", isNullable: false}),
      new TableColumn({name: "radius", type: "integer", isNullable: false}),
      new TableColumn({name: "FK_learnplace", type: "integer", isNullable: false})
    ]);

    const map: Table = new Table("Map", [
      new TableColumn({name: "id", type: "integer", isPrimary: true, generationStrategy: "increment", isNullable: false, isGenerated: true}),
      new TableColumn({name: "FK_visibility", type: "string", length: "128", isNullable: false}),
      new TableColumn({name: "FK_learnplace", type: "integer", isNullable: false})
    ]);

    const textBlock: Table = new Table("TextBlock", [
      new TableColumn({name: "id", type: "integer", isPrimary: true, generationStrategy: "increment", isNullable: false, isGenerated: true}),
      new TableColumn({name: "iliasId", type: "integer", isNullable: false}),
      new TableColumn({name: "content", type: "string", length: "5000", isNullable: false}),
      new TableColumn({name: "sequence", type: "integer", isNullable: false}),
      new TableColumn({name: "FK_visibility", type: "string", length: "128", isNullable: false}),
      new TableColumn({name: "FK_learnplace", type: "integer", isNullable: false})
    ]);

    const pictureBlock: Table = new Table("PictureBlock", [
      new TableColumn({name: "id", type: "integer", isPrimary: true, generationStrategy: "increment", isNullable: false, isGenerated: true}),
      new TableColumn({name: "iliasId", type: "integer", isNullable: false}),
      new TableColumn({name: "sequence", type: "integer", isNullable: false}),
      new TableColumn({name: "title", type: "string", length: "256", isNullable: false}),
      new TableColumn({name: "description", type: "string", length: "2000", isNullable: false}),
      new TableColumn({name: "thumbnail", type: "string", length: "256", isNullable: false}),
      new TableColumn({name: "url", type: "string", length: "256", isNullable: false}),
      new TableColumn({name: "FK_visibility", type: "string", length: "128", isNullable: false}),
      new TableColumn({name: "FK_learnplace", type: "integer", isNullable: false})
    ]);

    const linkBlock: Table = new Table("LinkBlock",[
      new TableColumn({name: "id", type: "integer", isPrimary: true, generationStrategy: "increment", isNullable: false, isGenerated: true}),
      new TableColumn({name: "iliasId", type: "integer", isNullable: false}),
      new TableColumn({name: "sequence", type: "integer", isNullable: false}),
      new TableColumn({name: "refId", type: "integer", isNullable: false}),
      new TableColumn({name: "FK_visibility", type: "string", length: "128", isNullable: false}),
      new TableColumn({name: "FK_learnplace", type: "integer", isNullable: false})
    ]);

    await queryRunner.createTable(learnplace);
    await queryRunner.createTable(visibility);
    await queryRunner.createTable(location);
    await queryRunner.createTable(map);
    await queryRunner.createTable(textBlock);
    await queryRunner.createTable(pictureBlock);
    await queryRunner.createTable(linkBlock);

    await queryRunner.insert("Visibility", {value: "ALWAYS"});
    await queryRunner.insert("Visibility", {value: "NEVER"});
    await queryRunner.insert("Visibility", {value: "ONLY_AT_PLACE"});
    await queryRunner.insert("Visibility", {value: "AFTER_VISIT_PLACE"});
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("Map");
    await queryRunner.dropTable("Location");
    await queryRunner.dropTable("Visibility");
    await queryRunner.dropTable("Learnplace");
    await queryRunner.dropTable("TextBlock");
    await queryRunner.dropTable("PictureBlock");
    await queryRunner.dropTable("LinkBLock");
  }
}
